/** @author Emir Furkan <efurkanbilici@gmail.com> */

import * as React from "react";
import axios from "axios";
import AutoComplete from "./Autocomplete";
import Layout from "./components/layout";

function App() {
  const [data, setData] = React.useState([]);

  const onMount = () => {
    try {
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((res) => setData(res.data));
    } catch (e) {
      console.error(e);
    }
  };

  React.useMemo(onMount, []);

  return (
    <div className="flex items-center justify-center">
      {data.length > 0 ? (
        <AutoComplete
          data={data}
          keys={["name", "username", "email", "website"]}
          component={{
            render: Layout,
          }}
        />
      ) : (
        <div className="wrapper bg-gray-200 animate-pulse" />
      )}
    </div>
  );
}

export default App;
