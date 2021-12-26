// @ts-nocheck


export const Cam: React.FC<{ options: any }> = ({ options }) => (
  <iframe height="480" width="640" title="indoor" src={options.url}></iframe>
  // <video src={options.url} height="480" width="640" >
  //   <source src={options.url} />
  // </video>
);

export default Cam;
