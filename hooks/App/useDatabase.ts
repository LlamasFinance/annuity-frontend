import { Contract } from "../";
import { useMoralisQuery, useNewMoralisObject } from "react-moralis";
import { useAlert } from "../App/useAlert";
import Moralis from "moralis";

export const useDatabase = () => {
  const { newAlert } = useAlert();
  const {
    object: newAgreement,
    isSaving: isSavingAgreement,
    error: savingAgreementError,
    save: saveAgreement,
  } = useNewMoralisObject("Agreement");
  const { fetch } = useMoralisQuery("Agreement");

  /**
   * save a new agreement
   */
  const saveNewAgreement = async (data: Contract.AgreementDetails) => {
    if (data.uid) {
      //delete data._id;
      saveAgreement(data, {
        onSuccess: (agreement) => {
          newAlert({
            type: "success",
            message: `Saved new agreement wit ID ${agreement.id} to database`,
          });
        },
        onError: (e) => {
          newAlert({ type: "error", message: e.message });
        },
      });
    }
  };

  /**
   * update an existing agreement
   */
  const updateAgreement = async (data: Contract.AgreementDetails) => {
    console.log("updating");
    console.log(data);
    const id = data.uid || "";
    const agreement = await getAgreement(id);
    if (agreement) {
      agreement.set(data);
      agreement.save();
      console.log(agreement);
    } else {
      await saveNewAgreement(data);
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

  return { saveNewAgreement, updateAgreement, getAgreement };
};

namespace Database {}
