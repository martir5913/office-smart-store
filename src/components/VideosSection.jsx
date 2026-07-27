export default function VideosSection({ videos }) {
  return (
    <section className="py-5" style={{ background: "#0d1b2a" }}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <span className="badge px-3 py-2 mb-2 fs-6" style={{ background: "#ffc107", color: "#0d1b2a" }}>
            <i className="bi bi-play-circle-fill me-1"></i>Videos
          </span>
          <h2 className="fw-bold display-6 text-white">Innovaciones para la Oficina</h2>
          <p className="text-white-50 lead">
            Conoce las últimas tendencias y tecnologías para transformar tu espacio de trabajo.
          </p>
          <div className="mx-auto" style={{ width: 60, height: 4, background: "#ffc107", borderRadius: 2 }} />
        </div>

        {/* Video grid */}
        <div className="row g-4">
          {videos.map((video) => (
            <div key={video.id} className="col-md-6 col-lg-4">
              <div
                className="card border-0 h-100 overflow-hidden"
                style={{ background: "#1a2a3a", borderRadius: 16 }}
              >
                {/* YouTube embed */}
                <div className="ratio ratio-16x9">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${video.youtubeId}`}
                    title={video.titulo}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    className="border-0"
                  />
                </div>

                {/* Info */}
                <div className="card-body p-4">
                  <h6 className="card-title fw-bold text-white mb-2">
                    <i className="bi bi-play-fill text-warning me-1"></i>
                    {video.titulo}
                  </h6>
                  <p className="card-text text-white-50 small mb-0">{video.descripcion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
