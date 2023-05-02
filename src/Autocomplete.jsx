import * as React from "react";
import PropTypes from "prop-types";
import { FiSearch } from "react-icons/fi";
import { useAutoAnimate } from "@formkit/auto-animate/react";

/**
 * @param {array} data
 * @param {array} keys
 * @param {object} component
 */
const AutoComplete = ({ data = [], keys = [], component }) => {
  const [parent] = useAutoAnimate({
    duration: 150,
  });

  const [state, setState] = React.useState({
    value: "",
    res: [],
    event: "init",
  });

  /**
   * To update state use following method
   * @param {object} obj
   */
  const updateState = (obj = {}) => {
    let inc = [],
      noInc = [],
      update = {};

    try {
      const [primary, secondary] = [state, obj].map(Object.keys);

      secondary.filter((val) =>
        !primary.includes(val) ? noInc.push(val) : inc.push(val)
      );

      if (noInc.length > 0) {
        throw {
          message:
            "An unnecessary value was encountered while trying to update state: ",
          source: noInc,
        };
      }
    } catch (e) {
      console.warn(e.message, e.source);
    }

    for (const curr of inc) {
      update[curr] = obj[curr];
    }

    setState({ ...state, ...update });
  };

  /**
   * @param {React.ChangeEvent} event
   */
  const handleChange = (event) => {
    const { value } = event.target;
    const results = [];

    const filteredByKey = data.map((item) => {
      let res = {};
      keys.forEach((key) => (res[key] = item[key]));
      return res;
    });

    filteredByKey.forEach((item) => {
      const searchTerms = Object.values(item);
      const filter = searchTerms.filter((term) => {
        const lcTerm = term.toLowerCase();
        return lcTerm.includes(value.toLowerCase());
      });

      if (filter.length > 0) results.push(item);
    });

    updateState({
      value,
      res: results,
      event:
        value.length > 0
          ? results.length > 0
            ? "done"
            : "no_result"
          : "no_enter",
    });
  };

  return (
    <div>
      <div className="wrapper border dark:border-slate-600">
        <label
          htmlFor="searchbox"
          className="absolute top-0 left-0 w-10 h-full flex items-center justify-center select-none cursor-pointer text-[#333] dark:text-[#888]"
        >
          <FiSearch size={18} />
        </label>
        <input
          type="search"
          placeholder="Find what you are looking for"
          className="w-full h-full text-slate-800 pl-8 dark:text-white/80 bg-transparent dark:placeholder:text-slate-400"
          autoFocus={true}
          id="searchbox"
          onChange={handleChange}
        />
      </div>
      <div className="mt-4 text-center">
        {(state.event === "init" || state.event === "no_enter") && (
          <span className="message font-bold text-gray-400 dark:text-gray-300">
            Type a keyword to search for results
          </span>
        )}
        {state.event === "no_result" && (
          <span className="message font-bold text-red-700 dark:text-red-400">
            There are no results matching your search
          </span>
        )}
        {state.event === "done" && (
          <>
            <span className="message dark:text-blue-300">
              <b>{state.res.length}</b> results are listed for your search
            </span>
            <div className="flex flex-col gap-4 pt-3 pb-16" ref={parent}>
              {state.res.map(($data, i) => (
                <component.render
                  key={i}
                  data={{
                    ...$data,
                    key: i,
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

AutoComplete.propTypes = {
  data: PropTypes.array.isRequired,
  keys: PropTypes.array.isRequired,
  component: PropTypes.object.isRequired,
};

export default AutoComplete;
