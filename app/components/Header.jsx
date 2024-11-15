import headerBackground from "../../app/HeaderBackground.jpg";

const Header = () => {
  return (
    <div
      className="flex flex-col justify-center mx-auto items-center gap-4 md:flex-row p-2 w-full -z-20 relative h-[80vh]"
      style={{
        backgroundImage: `url(${headerBackground.src})`,
        width: "100%",
        height: "100vh",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundSize: "cover",
        objectFit: "contain",
        objectPosition: "center",
      }}
    >
      <div className=" fixed  flex-col justify-center items-center p-3 gap-2">
        <div className=" flex flex-col justify-center items-center ">
          <h1 className="text-9xl font-bold font-bebas">Just Cook</h1>
          <p className="text-5xl text-left">Find and cook new recipes</p>
        </div>
      </div>
    </div>
  );
};
export default Header;
