import * as React from "react";
import PropTypes from "prop-types";
import { FiSearch, FiMail, FiLink2 } from "react-icons/fi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const AutoComplete = ({ data, keys = [] }) => {
  const [parent] = useAutoAnimate({
    duration: 150,
  });

  const [state, setState] = React.useState({
    value: "",
    res: [],
    event: "init",
  });

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

  const handleChange = (e) => {
    const { value } = e.target;
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
      <div className="wrapper border">
        <label
          htmlFor="searchbox"
          className="absolute top-0 left-0 w-10 h-full flex items-center justify-center select-none cursor-pointer"
        >
          <FiSearch size={18} color="#333" />
        </label>
        <input
          type="search"
          placeholder="Find what you are looking for"
          className="w-full h-full text-slate-800 pl-8"
          autoFocus={true}
          id="searchbox"
          onChange={handleChange}
        />
      </div>
      <div className="mt-4 text-center">
        {(state.event === "init" || state.event === "no_enter") && (
          <span className="message font-bold text-gray-400">
            Type a keyword to search for results
          </span>
        )}
        {state.event === "no_result" && (
          <span className="message font-bold text-red-700">
            There are no results matching your search
          </span>
        )}
        {state.event === "done" && (
          <>
            <span className="message">
              <b>{state.res.length}</b> results are listed for your search
            </span>
            <div className="flex flex-col gap-4 pt-3 pb-16" ref={parent}>
              {state.res.map((block, index) => (
                <div
                  key={index}
                  className="border rounded py-2 px-4 items-center profile-card"
                >
                  <div className="border rounded-xl overflow-hidden h-[64px]">
                    <LazyLoadImage
                      alt={`${block.name.split(" ")[0]}'s profile picture`}
                      src={`https://picsum.photos/64/64?random=${index}`}
                      effect="blur"
                      height={64}
                      width={64}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-between text-left gap-3">
                    <div className="flex flex-col">
                      <h3 className="text-slate-800 text-sm tracking-tighter font-semibold">
                        {block.name}
                      </h3>
                      <span className="text-[10px] leading-3 text-gray-500">
                        @{block.username}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <a
                        href={`mailto:${block.email}`}
                        className="flex items-center justify-start gap-1.5 text-slate-600 text-[11px] leading-4 hover:text-indigo-700 hover:underline"
                      >
                        <FiMail /> {block.email}
                      </a>
                      <a
                        href={block.website}
                        className="flex items-center justify-start gap-1.5 text-slate-600 text-[11px] leading-4 hover:text-indigo-700 hover:underline"
                      >
                        <FiLink2 /> {block.website}
                      </a>
                    </div>
                  </div>
                </div>
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
  keys: PropTypes.array,
};

export default AutoComplete;
