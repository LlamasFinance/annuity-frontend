import { Contract } from "../";
import { useMoralisQuery, useNewMoralisObject } from "react-moralis";
import { useAlert } from "../App/useAlert";
import Moralis from "moralis";
import { useState } from "react";

export const useDatabase = () => {
  const [isUpdatingDb, setUpdatingDb] = useState(false);
  const { newAlert } = useAlert();
  const {
    object: newAgreement,
    isSaving: isSavingAgreement,
    error: savingAgreementError,
    save: saveAgreement,
  } = useNewMoralisObject("Agreement");
  const { fetch } = useMoralisQuery("Agreement");

  /**
   * update an existing agreement
   */
  const updateAgreement = async (data: Contract.AgreementDetails) => {
    setUpdatingDb(true);
    console.log("updating");
    console.log(data);

    const id = data.uid || "";
    const agreement = await getAgreement(id);

    if (agreement) {
      agreement.set(data);
      const update = await agreement.save();
      if (update) {
        console.log(update);
        // newAlert({
        //   type: "success",
        //   message: `Updated agreement with ID ${id} to database`,
        // });
        setUpdatingDb(false);
      }
    } else {
      await saveAgreement(data, {
        onSuccess: (agreement) => {
          newAlert({
            type: "success",
            message: `Saved agreement (ID ${id}) to database`,
          });
          setUpdatingDb(false);
        },
        onError: (e) => {
          newAlert({ type: "error", message: e.message });
        },
      });
    }
  };

  /**
   * get an agreement
   */
  const getAgreement = async (id: string) => {
    const query = new Moralis.Query("Agreement");
    query.equalTo("uid", id);
    const agreement = await query.first();
    return agreement;
  };

  return { updateAgreement, getAgreement, isUpdatingDb };
};

namespace Database {}
