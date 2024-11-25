function Testimonials() {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-800">Testimonials</h2>
        <div className="flex flex-wrap justify-center mt-8">
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="bg-whitr p-6 rounded-lg shadow-md">
              <p className="text-gray-600">
                Amazing service! I m very satisfied with their work.{" "}
              </p>
              <p className="text-gray-800 font-semibpld mt-4">John Doe</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="bg-whitr p-6 rounded-lg shadow-md">
              <p className="text-gray-600">
                Greate experience ! Highly recommend their services.
              </p>
              <p className="text-gray-800 font-semibpld mt-4">Jane Doe</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="bg-whitr p-6 rounded-lg shadow-md">
              <p className="text-gray-600">
                They exceeded my expectations. Top-notch quality{" "}
              </p>
              <p className="text-gray-800 font-semibpld mt-4">Sam Doe</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;


