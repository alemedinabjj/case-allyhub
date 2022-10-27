interface ICountryProps {
  code: string;
  name: string;
  item: string;
}

export const Selects = ({ country, states, getFilteredStates, setGetFilteredStates, setValueState }: any) => {
  return (
    <div className="flex w-96 flex-col  max-w-7xl ">
      <h1>
        <span className="text-gray-400">2.</span> Destinos de interesse
      </h1>
      <div className="flex flex-col gap-">
        <div className="flex flex-col gap-2">
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">
            País
          </label>
          <select
            name="country"
            id="country"
            className="border border-gray-300 rounded-md block p-1"
            onChange={(e) => setGetFilteredStates(e.target.value)}
            required
          >
            <option value="">Selecione</option>
            {country.map((item: ICountryProps) => (
              <option key={item.code} value={item.code}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
            Estado
          </label>
          <select
            name="state"
            id="state"
            className="border border-gray-300 rounded-md block p-1"
            onChange={(e) => setValueState(e.target.value)}
            required
          >
            <option value="">Selecione</option>
            {states
              .filter((item: any) => item?.country_code === getFilteredStates)
              .sort((a: any, b: any) => (a.name > b.name ? 1 : -1))
              .map((item: any) => (
                <option key={item.code} value={item.code}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>
      </div>
    </div>
  );
};
