import { useRef, useCallback } from "react";
import { FormHandles } from "@unform/core";

export const useUnForm = () => {
  const formRef = useRef<FormHandles>(null);

  const onSavingAndClose = useRef(false);
  const onSavingAndNew = useRef(false);

  const save = useCallback(() => {
    onSavingAndClose.current = false;
    onSavingAndNew.current = false;

    formRef.current?.submitForm();
  }, []);

  const saveAndNew = useCallback(() => {
    onSavingAndClose.current = false;
    onSavingAndNew.current = true;

    formRef.current?.submitForm();
  }, []);

  const saveAndBack = useCallback(() => {
    onSavingAndClose.current = true;
    onSavingAndNew.current = false;

    formRef.current?.submitForm();
  }, []);

  const isSave = useCallback(() => {
    return onSavingAndNew.current;
  }, []);

  const isSaveAndBack = useCallback(() => {
    return onSavingAndClose.current;
  }, []);

  return {
    formRef,
    save,
    isSave,
    saveAndNew,
    saveAndBack,
    isSaveAndBack,
  };
};
