import { IconBase } from "../utils/Icons";
import { IMaskInput } from "react-imask";
import { useMemo } from "react";
import { Selects } from "./Selects";
import { useForm } from "../contexts/FormProvider";

export const DataPersonForm = () => {
  const { data, setData, country, states, getFilteredStates, setGetFilteredStates, valueState, setValueState, getCountry, getStates, submitForm } =
    useForm();

  useMemo(() => {
    getCountry();
    getStates();
  }, []);

  return (
    <div className="mt-10">
      <div className="flex-1 flex flex-col gap-2">
        <form className="flex flex-col md:flex-row gap-4 m-auto" onSubmit={submitForm}>
          <div className="flex flex-col">
            <h2>
              <span className="text-gray-400">1.</span> Dados pessoais
            </h2>
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nome
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="border border-gray-300 rounded-md block p-1"
                placeholder="Jose da Silva"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IconBase name="Envelope" className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 border border-gray-300 rounded-md p-1"
                  placeholder="jose@example.com"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">
                Telefone
              </label>

              <IMaskInput
                mask="(00) 00000-0000"
                unmask={true}
                //@ts-ignore
                name="telephone"
                id="telephone"
                className="border border-gray-300 rounded-md p-2"
                placeholder="(00) 00000-0000"
                value={data.telephone}
                //@ts-ignore
                onAccept={(value) => setData({ ...data, telephone: value })}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">
                CPF
              </label>
              <IMaskInput
                mask="000.000.000-00"
                unmask={true}
                //@ts-ignore
                placeholder="000.000.000-00"
                className="border border-gray-300 rounded-md p-2"
                value={data.cpf}
                //@ts-ignore
                onAccept={(value) => setData({ ...data, cpf: value })}
              />
            </div>
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
