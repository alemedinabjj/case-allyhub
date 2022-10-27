import { createContext, useContext, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { regExEmail } from "../utils/regEx";

export const FormContext = createContext({} as any);

export const FormProvider = ({ children }: any) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    telephone: "",
    cpf: "",
  });
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
    const reponse = await axios.get("https://amazon-api.sellead.com/country");
    setCountry(reponse.data);
  };

  const getStates = async () => {
    const reponse = await axios.get("https://amazon-api.sellead.com/city");
    setStates(reponse.data);
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    const id = uuidv4();
    e.preventDefault();

    const { name, email, telephone, cpf } = data;

    const emailValid = regExEmail.test(email);

    //verificar cada campo se está vazio ou não e se o email é válido ou não
    if (name === "" || email === "" || telephone === "" || cpf === "" || !emailValid) {
      alert("Preencha todos os campos corretamente");
      return;
    }

    if (name && emailValid && telephone && cpf && valueState) {
      setShowData({
        id: id,
        name,
        email,
        telephone,
        cpf,
        country: getFilteredStates,
        state: valueState,
      });
      setData({ name: "", email: "", telephone: "", cpf: "" });
      setListItems([...listItems, { name, email, telephone, cpf, id, country: getFilteredStates, state: valueState }]);
      localStorage.setItem(
        "listItems",
        JSON.stringify([...listItems, { name, email, telephone, cpf, id, country: getFilteredStates, state: valueState }])
      );
    }
  };

  const deleteItem = (id: string) => {
    const newList = listItems.filter((item: any) => item.id !== id);
    setListItems(newList);
    localStorage.setItem("listItems", JSON.stringify(newList));
  };

  return (
    <FormContext.Provider
      value={{
        data,
        setData,
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
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => useContext(FormContext);
