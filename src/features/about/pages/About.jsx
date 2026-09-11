import { ShieldCheck, Users, HeartHandshake } from "lucide-react";

export default function About() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="landing-container">
          <span className="about-eyebrow">
            About STALLIFS
          </span>

          <h1>
            Insurance made
            <span>simple and accessible.</span>
          </h1>

          <p>
            STALLIFS brings insurance products,
            applications, payments, and policy
            management together in one simple
            platform.
          </p>
        </div>
      </section>


      <section className="about-story">
        <div className="landing-container">
          <div className="about-story-grid">

            <div className="about-story-content">
              <span className="about-section-eyebrow">
                Who We Are
              </span>

              <h2>
                Protection built around people.
              </h2>

              <p>
                STALLIFS Insurance is designed to
                make getting and managing insurance
                easier for individuals and businesses.
              </p>

              <p>
                From discovering the right cover to
                requesting a quote, submitting an
                application, making payments, and
                managing policies, STALLIFS brings
                the experience together in one place.
              </p>
            </div>


            <div className="about-values">

              <div className="about-value-card">
                <div className="about-value-icon">
                  <ShieldCheck size={24} />
                </div>

                <div>
                  <h3>Protection</h3>

                  <p>
                    Helping customers protect what
                    matters most.
                  </p>
                </div>
              </div>


              <div className="about-value-card">
                <div className="about-value-icon">
                  <Users size={24} />
                </div>

                <div>
                  <h3>Accessibility</h3>

                  <p>
                    Making insurance easier to
                    understand and access.
                  </p>
                </div>
              </div>


              <div className="about-value-card">
                <div className="about-value-icon">
                  <HeartHandshake size={24} />
                </div>

                <div>
                  <h3>Trust</h3>

                  <p>
                    Building a straightforward
                    experience customers can rely on.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </main>
  );
}