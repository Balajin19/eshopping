import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import { PageTitle } from "../components/PageTitle";
export const Contact = () => {
  return (
    <>
      <PageTitle title={"Contact Us"} />
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="/images/contact_us.jpeg"
            alt="contactus"
            style={{ width: "100%", height: "300px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-4 text-justify m-2">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            any query and info about product feel free to call anytime we 24x7
            available
          </p>
          <p className="mt-3">
            <BiMailSend /> : www.help@ecommerceapp.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 012-3456789
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-0000-0000 (toll free)
          </p>
        </div>
      </div>
    </>
  );
};
