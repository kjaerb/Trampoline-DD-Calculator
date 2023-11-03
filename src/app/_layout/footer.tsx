export function Footer() {
  return (
    <footer className="py-4 mt-4 border-t">
      <div className="flex justify-between items-center text-gray-500 text-xs flex-col sm:flex-row">
        <p>&copy; {new Date().getFullYear()} - Benjamin Kjær</p>
        <div className="flex flex-col sm:flex-row justify-center items-center">
          <p className="flex items-center mt-2 sm:mt-0">
            Made with{" "}
            <svg
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              color="#000"
              className="ml-1"
            >
              <path
                fillRule="evenodd"
                d="M6.736 4C4.657 4 2.5 5.88 2.5 8.514c0 3.107 2.324 5.96 4.861 8.12a29.66 29.66 0 004.566 3.175l.073.041.073-.04c.271-.153.661-.38 1.13-.674.94-.588 2.19-1.441 3.436-2.502 2.537-2.16 4.861-5.013 4.861-8.12C21.5 5.88 19.343 4 17.264 4c-2.106 0-3.801 1.389-4.553 3.643a.75.75 0 01-1.422 0C10.537 5.389 8.841 4 6.736 4zM12 20.703l.343.667a.75.75 0 01-.686 0l.343-.667zM1 8.513C1 5.053 3.829 2.5 6.736 2.5 9.03 2.5 10.881 3.726 12 5.605 13.12 3.726 14.97 2.5 17.264 2.5 20.17 2.5 23 5.052 23 8.514c0 3.818-2.801 7.06-5.389 9.262a31.146 31.146 0 01-5.233 3.576l-.025.013-.007.003-.002.001-.344-.666-.343.667-.003-.002-.007-.003-.025-.013A29.308 29.308 0 0110 20.408a31.147 31.147 0 01-3.611-2.632C3.8 15.573 1 12.332 1 8.514z"
              ></path>
            </svg>
          </p>
        </div>
        <div className="mt-2 sm:mt-0 flex flex-col sm:flex-row items-center justify-center ml-0 sm:ml-1">
          <p className="py-0 my-0">Want to support me?</p>
          <a
            href="https://www.buymeacoffee.com/benjaminkjaer"
            target="_blank"
            className="ml-1 mt-2 sm:mt-0"
          >
            <img
              src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png"
              alt="Buy Me A Coffee"
              className="h-[30px] w-[108px] mx-auto"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
