function Footer() {
  const year = new Date().toISOString().split('-')[0];
  return (
    <footer className="bg-secondary text-white flex flex-row p-8 mt-auto">
      <div className="flex flex-row items-center justify-between xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm xs:max-w-screen-xs mx-auto w-full">
        <div className="flex flex-col items-center mx-auto">
          <span className="text-primary">
            {year} © Empowerment Technology Corporation
          </span>
          <a
            className="text-primary hover:underline underline-offset-1"
            href="mailto:empowermenttechnologycorp@gmail.com"
            target="_blank"
          >
            empowermenttechnologycorp@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
