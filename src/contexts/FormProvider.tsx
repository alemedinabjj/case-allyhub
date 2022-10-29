import { createContext, useContext, useState } from "react";
import { api } from "../services/api";
import { v4 as uuidv4 } from "uuid";
import { useForm as reactUseForm, FieldValues, SubmitHandler } from "react-hook-form";

export const FormContext = createContext({} as any);

export const FormProvider = ({ children }: any) => {
  const { register, handleSubmit, formState } = reactUseForm();

  const [showData, setShowData] = useState({
    id: "",
    name: "",
    email: "",
    telephone: "",
    cpf: "",
    country: "",
    state: "",
  });
  const [listItems, setListItems] = useState<any>(JSON.parse(localStorage.getItem("listItems") || "[]"));
  const [states, setStates] = useState([]);
  const [country, setCountry] = useState([]);
  const [getFilteredStates, setGetFilteredStates] = useState("");
  const [valueState, setValueState] = useState("");

  const getCountry = async () => {
    const reponse = await api.get("country");
    setCountry(reponse.data);
  };

  const getStates = async () => {
    const reponse = await api.get("city");
    setStates(reponse.data);
  };

  const submitForm: SubmitHandler<FieldValues> = (values) => {
    console.log("FOI");
    console.log(values);
    const id = uuidv4();

    const showData = {
      id,
      name: values.name,
      email: values.email,
      telephone: values.telephone,
      cpf: values.cpf,
      country: getFilteredStates,
      state: valueState,
    };

    setListItems([...listItems, showData]);
    localStorage.setItem("listItems", JSON.stringify([...listItems, showData]));
    setShowData(showData);
  };

  const deleteItem = (id: string) => {
    const newList = listItems.filter((item: any) => item.id !== id);
    setListItems(newList);
    localStorage.setItem("listItems", JSON.stringify(newList));
  };

  return (
    <FormContext.Provider
      value={{
        states,
        setStates,
        country,
        setCountry,
        getFilteredStates,
        setGetFilteredStates,
        valueState,
        setValueState,
        getCountry,
        getStates,
        showData,
        setShowData,
        listItems,
        setListItems,
        submitForm,
        deleteItem,
        register,
        handleSubmit,
        formState,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => useContext(FormContext);
