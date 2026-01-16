import React from 'react';

const BlogSingle = () => {
  // Podaci izvučeni iz tvog HTML-a (priprema za props ili API)
  const postData = {
    title: "Mladena Grdovića policija je uhitila s 3,6 promila alkohola u krvi za volanom",
    subheading: "Bez dlake na jeziku",
    author: "Zvonimir Milaković",
    date: "15. prosinca, 2025",
    bgImage: "img/mladen-grdovic-1.jpeg",
    videoSrc: "https://www.youtube.com/embed/6Ys_NniqIjE",
    quote: "Ne žalim zbog toga. Tu su postojale izdajice, oni ljubomorni, jer sam uvijek vozio dobar auto. Onaj koga si častio, taj te prvi izdao"
  };

  return (
    <article className="blog-post">
      {/* Masthead / Header sekcija članka */}
      <header 
        className="masthead text-white py-5 mb-4" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${postData.bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-md-10 col-lg-8">
              <h1 className="display-3 fw-bold">{postData.title}</h1>
              <h2 className="h4 fw-light mb-3">{postData.subheading}</h2>
              <div className="meta font-italic">
                Autor: <a href="#!" className="text-white border-bottom text-decoration-none">{postData.author}</a>, {postData.date}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sadržaj članka */}
      <div className="container px-4 px-lg-5">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            
            <p className="lead fw-bold border-start border-danger border-4 ps-3 my-4">
              "{postData.quote}", kazao je Grdović u emisiji.
            </p>

            <p>
              Mladen Grdović, legenda hrvatske zabavne glazbe, nedavno je gostovao u našoj emisiji "Show na kvadrat", 
              a gdje je govorio o mnogim zanimljivostima iz privatnog života...
            </p>

            {/* Responzivni Video Embed */}
            <div className="ratio ratio-16x9 my-5 shadow">
              <iframe 
                src={postData.videoSrc} 
                title="YouTube video player" 
                allowFullScreen
              ></iframe>
            </div>

            <p>
              Podsjetimo, glazbenik je gostovao u našoj emisiji zbog iznimnog jubileja – <strong>45 godina karijere.</strong> 
              Tom prilikom podijelio je s publikom detalje iz svog privatnog života...
            </p>
            
            <div className="bg-light p-4 rounded-3 my-4 border-start border-danger border-4">
               <h5>Nadolazeći događaji:</h5>
               <ul>
                 <li>Doček Nove godine u Sisku</li>
                 <li>8. veljače - 45 godina karijere (Lisinski)</li>
               </ul>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogSingle;