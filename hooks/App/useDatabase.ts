import { Contract } from "../";
import { useNewMoralisObject } from "react-moralis";
import { useAlert } from "../App/useAlert";

export const useDatabase = () => {
  const { newAlert } = useAlert();
  const {
    object: AgreementObj,
    isSaving: isSavingAgreement,
    error: SavingAgreementError,
    save: saveAgreement,
  } = useNewMoralisObject("Agreement");

  /**
   * save a new agreement
   */
  const saveNewAgreement = async (data: Contract.AgreementDetails) => {
    if (data._id) {
      delete data._id;
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
    //   if (data.id) {
    //       const {}
    //   }
  };

  return { saveNewAgreement };
};

namespace Database {}
