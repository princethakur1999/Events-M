import React from 'react';
import { Transition } from 'react-transition-group';

function getRandomImageURL() {

    const imageNumber = Math.floor(Math.random() * 10) + 1;
    return `https://source.unsplash.com/400x300/?nature${imageNumber}`;
}

const Home = () => {

    return (

        <div className="bg-gray-100">

            {/* Hero Section */}
            <div className="bg-rose-900  text-center py-16 flex flex-col justify-center items-center">
                <h1 className="text-4xl font-semibold p-4 mb-4 bg-white text-rose-900 rounded-full">
                    SSU Event Manager
                </h1>
            </div>

            {/* Gallery Section */}
            <div className="container mx-auto py-8 px-1">
                <h2 className="text-3xl font-semibold text-center text-rose-900 mb-8">
                    Event Gallery
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

                    {/* Gallery Item 1 */}
                    <Transition in={true} timeout={500} appear>
                        {(state) => (
                            <div
                                className={`rounded-lg overflow-hidden shadow-lg transform ${state === 'entered'
                                    ? 'opacity-100 scale-100'
                                    : 'opacity-0 scale-90'
                                    } transition-all duration-500 ease-in-out`}
                            >
                                <img src={getRandomImageURL()} alt="Gallery Item 1" className="w-full h-48 object-cover" />
                            </div>
                        )}
                    </Transition>

                    {/* Gallery Item 2 */}
                    <Transition in={true} timeout={700} appear>
                        {(state) => (
                            <div
                                className={`rounded-lg overflow-hidden shadow-lg transform ${state === 'entered'
                                    ? 'opacity-100 scale-100'
                                    : 'opacity-0 scale-90'
                                    } transition-all duration-500 ease-in-out`}
                            >
                                <img src={getRandomImageURL()} alt="Gallery Item 2" className="w-full h-48 object-cover" />
                            </div>
                        )}
                    </Transition>

                    {/* Gallery Item 3 */}
                    <Transition in={true} timeout={900} appear>
                        {(state) => (
                            <div
                                className={`rounded-lg overflow-hidden shadow-lg transform ${state === 'entered'
                                    ? 'opacity-100 scale-100'
                                    : 'opacity-0 scale-90'
                                    } transition-all duration-500 ease-in-out`}
                            >
                                <img src={getRandomImageURL()} alt="Gallery Item 3" className="w-full h-48 object-cover" />
                            </div>
                        )}
                    </Transition>
                </div>
            </div>

            {/* Guidelines Section */}
            <div className="container mx-auto py-16">
                <h2 className="text-3xl font-semibold text-center text-rose-900 mb-8">
                    Guidelines
                </h2>

                <p className="text-lg text-gray-600 text-center">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec diam eu lacus aliquam.
                </p>
            </div>

            {/* Department Section */}
            <div className="container mx-auto py-16 px-1">

                <h2 className="text-3xl font-semibold text-center text-rose-900 mb-8">
                    Project Members
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {/* Department Item 1 */}
                    <Transition in={true} timeout={1100} appear>
                        {(state) => (
                            <div
                                className={`bg-white rounded-lg overflow-hidden shadow-lg transform ${state === 'entered'
                                    ? 'opacity-100 scale-100'
                                    : 'opacity-0 scale-90'
                                    } transition-all duration-500 ease-in-out`}
                            >
                                <img src={getRandomImageURL()} alt="Department 1" className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold mb-2 text-rose-900">Sayantan Manna</h3>
                                    <p className="text-gray-600">
                                        Frontend Designer
                                    </p>
                                </div>
                            </div>
                        )}
                    </Transition>

                    {/* Department Item 2 */}
                    <Transition in={true} timeout={1300} appear>
                        {(state) => (
                            <div
                                className={`bg-white rounded-lg overflow-hidden shadow-lg transform ${state === 'entered'
                                    ? 'opacity-100 scale-100'
                                    : 'opacity-0 scale-90'
                                    } transition-all duration-500 ease-in-out`}
                            >
                                <img src={getRandomImageURL()} alt="Department 2" className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold mb-2 text-rose-900">Pallavi</h3>
                                    <p className="text-gray-600">
                                        Frontend Developer
                                    </p>
                                </div>
                            </div>
                        )}
                    </Transition>

                    {/* Department Item 3 */}
                    <Transition in={true} timeout={1500} appear>
                        {(state) => (
                            <div
                                className={`bg-white rounded-lg overflow-hidden shadow-lg transform ${state === 'entered'
                                    ? 'opacity-100 scale-100'
                                    : 'opacity-0 scale-90'
                                    } transition-all duration-500 ease-in-out`}
                            >
                                <img src={getRandomImageURL()} alt="Department 3" className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold mb-2 text-rose-900">Krushna Konkane</h3>
                                    <p className="text-gray-600">
                                        Frontend Developer
                                    </p>
                                </div>
                            </div>
                        )}
                    </Transition>

                    {/* Department Item 4 */}
                    <Transition in={true} timeout={1700} appear>
                        {(state) => (
                            <div
                                className={`bg-white rounded-lg overflow-hidden shadow-lg transform ${state === 'entered'
                                    ? 'opacity-100 scale-100'
                                    : 'opacity-0 scale-90'
                                    } transition-all duration-500 ease-in-out`}
                            >
                                <img src={getRandomImageURL()} alt="Department 4" className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold mb-2 text-rose-900">Prince Thakur</h3>
                                    <p className="text-gray-600">
                                        Backend Developer
                                    </p>
                                </div>
                            </div>
                        )}
                    </Transition>
                </div>
            </div>
        </div>
    );
};

export default Home;
