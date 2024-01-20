import { PageTitle } from "../components/PageTitle";

export const About = () => {
  return (
    <>
      <PageTitle title={"About"}/>
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="/images/about.avif"
            alt="about"
            style={{ width: "100%", height: "300px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-4 text-justify m-2">
          <p className="text-justify mt-2">
            A remarkable about page is genuine, approachable, and distinguished.
            Visitors should get a glimpse into what working with you might be
            like. You can include personal interests, stories, and photos that
            convey the unique story of your business. About pages are personal
            to you and your company, so the structure of your about page will
            vary based on what you want to highlight. However, you'll start with
            the same writing process.
          </p>
        </div>
      </div>
    </>
  );
};
