const BoxReview = () => {
  return (
    <div className="flex flex-col gap-4 w-full p-5 h-auto bg-gray-100">
      {
        Array(3)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="w-full h-[200px] ring-1 ring-gray-300 bg-white rounded-sm">
              <div className="flex px-8 py-5 justify-between">
                <div className="flex gap-5">
                  <div className="rounded-full w-15 h-15 bg-black"></div>
                  <div className="flex flex-col justify-evenly">
                    <span className="font-bold">Siapa ya</span>
                    <span>21 Aug 2025</span>
                  </div>
                </div>
              </div>

              <div className="px-8">
                <p className="text-justify font-light">
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
                </p>
              </div>
            </div>
          ))
      }
    </div>
  );
};

export default BoxReview;