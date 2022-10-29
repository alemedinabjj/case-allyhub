import { IconBase } from "../utils/Icons";
import { useMemo } from "react";
import { Selects } from "./Selects";
import { useForm } from "../contexts/FormProvider";
import { useForm as reactUseForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "./Input";

const schema = yup.object().shape({
  name: yup.string().required("Campo obrigatório"),
  email: yup.string().required("Campo obrigatório").email("Email inválido"),
  telephone: yup.string().required("Campo obrigatório"),
  cpf: yup.string().required("Campo obrigatório"),
});

export const DataPersonForm = () => {
  const { country, states, getFilteredStates, setGetFilteredStates, valueState, setValueState, getCountry, getStates, submitForm } = useForm();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = reactUseForm({
    resolver: yupResolver(schema),
  });

  useMemo(() => {
    getCountry();
    getStates();
  }, []);

  return (
    <div className="mt-10">
      <div className="flex-1 flex flex-col gap-2">
        <form className="flex flex-col md:flex-row gap-4 m-auto" onSubmit={handleSubmit(submitForm)}>
          <div className="flex flex-col">
            <h2>
              <span className="text-gray-400">1.</span> Dados pessoais
            </h2>
            <Input label="Nome" type="text" placeholder="Digite seu nome" {...register("name")} error={errors.name} />
            <Input label="Email" type="email" placeholder="Digite seu email" {...register("email")} error={errors.email} />
            <Input label="Telefone" type="text" placeholder="Digite seu telefone" {...register("telephone")} error={errors.telephone} />
            <Input label="CPF" type="text" placeholder="Digite seu CPF" {...register("cpf")} error={errors.cpf} />
          </div>
          <div className="flex flex-col justify-between">
            {" "}
            <Selects
              getCountry={getCountry}
              getStates={getStates}
              country={country}
              states={states}
              getFilteredStates={getFilteredStates}
              setGetFilteredStates={setGetFilteredStates}
              valueState={valueState}
              setValueState={setValueState}
            />
            <button type="submit" className="bg-indigo-500 text-white rounded-md p-2 flex self-end hover:brightness-75 transition items-center gap-2">
              <IconBase name="PaperPlaneRight" className="h-5 w-5 text-white" aria-hidden="true" />
              <span>Enviar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
