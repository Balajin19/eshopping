import { PageTitle } from "../components/PageTitle";

export const Policy = () => {
  return (
    <>
      <PageTitle title={"Privacy Policy"} />
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="/images/policy.jfif"
            alt="contactus"
            style={{ width: "100%", height: "300px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-4 text-justify m-2">
          <p className="text-justify mt-2">
            A Privacy Policy is a document where you disclose what personal data
            you collect from your website's visitors, how you collect it, how
            you use it and other important details about your privacy practices.
            In this post, we'll take a look at what Privacy Policies are and why
            you likely need to have one posted on your website. Finally, we'll
            look at how different websites display their Privacy Policies.
          </p>
        </div>
      </div>
    </>
  );
};
