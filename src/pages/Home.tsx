import { DataPersonForm } from "../components/Form";
import { Header } from "../components/Header";
import { Tabela } from "../components/Tabela";
import { FormProvider } from "../contexts/FormProvider";

export const Home = () => {
  return (
    <FormProvider>
      <div className="min-h-screen">
        <Header />
        <div className="p-3 max-w-1/2 flex flex-col items-center gap-10">
          <DataPersonForm />
          <Tabela />
        </div>
      </div>
    </FormProvider>
  );
};
