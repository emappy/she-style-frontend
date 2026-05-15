function AdminReviews() {
  const reviews = [
    {
      id: 1,
      customer: "Sophia",
      rating: 5,
      product: "Elegant Black Dress",
      review: "Amazing quality and perfect fitting. I love it!",
    },

    {
      id: 2,
      customer: "Emily",
      rating: 4,
      product: "Pink Summer Top",
      review: "Very stylish and comfortable to wear.",
    },

    {
      id: 3,
      customer: "Olivia",
      rating: 5,
      product: "Luxury Head Band",
      review: "Beautiful product and fast delivery.",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Reviews</h1>

        <p className="text-gray-500 mt-2">Customer feedback and ratings</p>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-2xl font-bold">{review.customer}</h2>

                  <div className="flex gap-1">
                    {Array.from({
                      length: review.rating,
                    }).map((_, index) => (
                      <span key={index} className="text-pink-400 text-xl">
                        ★
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-gray-500 mb-4">
                  Product:
                  <span className="font-medium ml-2 text-black">
                    {review.product}
                  </span>
                </p>

                <p className="text-gray-700 leading-relaxed">
                  "{review.review}"
                </p>
              </div>

              <div className="flex gap-3">
                <button className="bg-pink-300 text-black px-5 py-2 rounded-xl">
                  Approve
                </button>

                <button className="bg-black text-white px-5 py-2 rounded-xl">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminReviews;
