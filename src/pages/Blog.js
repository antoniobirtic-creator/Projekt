import React from 'react';

const Blog = () => {
  // Senior praksa: Podaci su odvojeni od HTML-a (JSX-a)
  const posts = [
    {
      id: 1,
      title: "Uvod u React Router",
      text: "Naučite kako raditi navigaciju bez osvježavanja stranice koristeći Link i NavLink komponente.",
      img: "https://picsum.photos/id/1/600/400"
    },
    {
      id: 2,
      title: "Bootstrap 5 Savjeti",
      text: "Kako brzo kreirati responzivan layout koristeći samo ugrađene Bootstrap klase.",
      img: "https://picsum.photos/id/2/600/400"
    },
    {
      id: 3,
      title: "Senior Developer Mindset",
      text: "Fokus na čisti kod, performanse i arhitekturu aplikacije je ono što razlikuje juniore od seniora.",
      img: "https://picsum.photos/id/3/600/400"
    }
  ];

  return (
    <div className="pb-5">
      {/* Header sekcija */}
      <header className="text-center my-5">
        <h1 className="display-4 fw-bold text-danger">Blog Vijesti</h1>
        <p className="lead text-muted">Sve novosti iz svijeta codinga na jednom mjestu.</p>
      </header>

      {/* Grid sa člancima */}
      <div className="row g-4">
        {posts.map((post) => (
          <div className="col-md-4" key={post.id}>
            <div className="card h-100 shadow-sm border-0">
              <img 
                src={post.img} 
                className="card-img-top" 
                alt={post.title} 
              />
              <div className="card-body">
                <h5 className="card-title fw-bold">{post.title}</h5>
                <p className="card-text text-secondary">
                  {post.text}
                </p>
              </div>
              <div className="card-footer bg-white border-0 pb-3">
                <button className="btn btn-outline-danger btn-sm">Pročitaj više</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;