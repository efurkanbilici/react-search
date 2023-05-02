import PropTypes from "prop-types";
import { FiMail, FiLink2 } from "react-icons/fi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Layout = ({ data = {} }) => (
  <div className="border rounded py-2 px-4 items-center profile-card dark:border-gray-700">
    <div className="border rounded-xl overflow-hidden h-[64px] dark:border-gray-700">
      <LazyLoadImage
        alt={`${data.name.split(" ")[0]}'s profile picture`}
        src={`https://picsum.photos/64/64?random=${data.key}`}
        effect="blur"
        height={64}
        width={64}
        className="object-cover"
      />
    </div>
    <div className="flex flex-col justify-between text-left gap-3">
      <div className="flex flex-col">
        <h3 className="text-slate-800 dark:text-slate-300 text-sm tracking-tighter font-semibold">
          {data.name}
        </h3>
        <span className="text-[10px] leading-3 text-gray-500 dark:text-slate-400">
          @{data.username}
        </span>
      </div>
      <div className="flex flex-col">
        <a
          href={`mailto:${data.email}`}
          className="flex items-center justify-start gap-1.5 text-slate-600 dark:text-slate-500 text-[11px] leading-4 hover:text-indigo-700 dark:hover:text-indigo-300 hover:underline"
        >
          <FiMail /> {data.email}
        </a>
        <a
          href={`https://${data.website}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-start gap-1.5 text-slate-600 dark:text-slate-500 text-[11px] leading-4 hover:text-indigo-700 dark:hover:text-indigo-300 hover:underline"
        >
          <FiLink2 /> {data.website}
        </a>
      </div>
    </div>
  </div>
);

Layout.propTypes = {
  data: PropTypes.object,
};

export default Layout;
