import ContentLoader from "react-content-loader";

const tableSkeleton = () => {
  return (
    <ContentLoader
      speed={2}
      width={400}
      height={200}
      viewBox="0 0 400 200"
      backgroundColor="#e3e3e3"
      foregroundColor="#ecebeb">
      <rect x="47" y="61" rx="0" ry="0" width="58" height="12" />
      <rect x="148" y="61" rx="0" ry="0" width="136" height="12" />
      <rect x="327" y="61" rx="0" ry="0" width="58" height="12" />
      <rect x="48" y="82" rx="0" ry="0" width="58" height="12" />
      <rect x="149" y="82" rx="0" ry="0" width="136" height="12" />
      <rect x="327" y="83" rx="0" ry="0" width="58" height="12" />
      <rect x="45" y="102" rx="0" ry="0" width="58" height="12" />
      <rect x="46" y="123" rx="0" ry="0" width="58" height="12" />
      <rect x="149" y="123" rx="0" ry="0" width="136" height="12" />
      <rect x="325" y="124" rx="0" ry="0" width="58" height="12" />
      <rect x="149" y="103" rx="0" ry="0" width="136" height="12" />
      <rect x="326" y="103" rx="0" ry="0" width="58" height="12" />
      <rect x="47" y="141" rx="0" ry="0" width="58" height="12" />
      <rect x="150" y="141" rx="0" ry="0" width="136" height="12" />
      <rect x="326" y="142" rx="0" ry="0" width="58" height="12" />
    </ContentLoader>
  );
};

export default tableSkeleton;
