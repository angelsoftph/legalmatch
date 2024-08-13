import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import locations from '../data/locations.json';
import '../App.scss'

interface Location {
    city: string;
    zip: string;
  }

interface CaseType {
    id: number;
    name: string;
}

interface Category {
    id: number;
    name: string;
    children: CaseType[];
}

const Home: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredData, setFilteredData] = useState<Location[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [caseTypes, setCaseTypes] = useState<CaseType[]>([]);
    const [showCaseTypes, setShowCaseTypes] = useState(false);
    const [showClientReviews, setShowClientReviews] = useState(false);
    const [showLocations, setShowLocations] = useState(false);
    const [expand, setExpand] = useState(false);
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('./src/data/categories.json');
                const data = await response.json();
                setCategories(data.categories);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchCategories();
    }, []);

    useEffect(() => {
        if (expand) {
            document.addEventListener('click', handleClickAnywhere);
        } else {
            document.removeEventListener('click', handleClickAnywhere);
        }

        return () => {
          document.removeEventListener('click', handleClickAnywhere);
        };
    }, [expand]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);
        setShowLocations(true);

        const filtered = locations.locations.filter((item: Location) =>
            item.city.toLowerCase().includes(value) || item.zip.includes(value)
        );
        setFilteredData(filtered);
    };

    const handleExpand = () => {
        setExpand(!expand);
    }

    const handleClickAnywhere = (event: MouseEvent) => {
        if (divRef.current && !divRef.current.contains(event.target as Node)) {
          setExpand(false);
        }
    };

    const handleShowCaseTypes = async (cat_id: number) => {
        const response = await fetch('./src/data/categories.json');
        const data = await response.json();

        // const found = data.categories.find((cat: Category) => cat.id === Number(cat_id));

        // because we don't have available case types for the other
        // categories yet, let's hardcode the value of cat_id for now
        const found = data.categories.find((cat: Category) => cat.id === 1 );

        setCaseTypes(found.casetypes || null);

        setShowCaseTypes(true);
    }

    const handleShowClientReviews = () => {
        setShowClientReviews(true);
    }

    const handleSelectLocation = (location: string) => {
        setSearchTerm(location);
        setShowLocations(false);
    }

    return (
        <>
            {
                showCaseTypes && (
                    <div id="popup-casetypes">
                        <div className="mask"></div>
                        <div className="wrapper flex flex-col">
                            <div className="flex flex-row items-center">
                                <div className="step flex items-center justify-center">3</div>
                                <div className="flex-1 pl-4"><p>Which <strong>Family Law</strong> issue(s) apply to your case?</p></div>
                            </div>
                            <div className="grid grid-cols-1 600px:grid-cols-2 mx-2 mt-8 gap-5">
                                {
                                    caseTypes.map((type) => (
                                        <div className="flex flex-row gap-4 items-center" key={type.id}>
                                            <div><input type="checkbox" /></div>
                                            <div className="casetype">{type.name}</div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="close" onClick={() => setShowCaseTypes(false)}></div>
                            <div className="flex flex-1 items-end justify-center">
                                <button>FIND A LAWYER NOW</button>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                showClientReviews && (
                    <div id="popup-reviews">
                        <div className="mask"></div>
                        <div className="wrapper flex flex-col gap-3">
                            <div>
                                <h3>CLIENT REVIEWS</h3>
                            </div>
                            <div>
                                <hr />
                            </div>
                            <div className="flex flex-row mb-3 items-center gap-3">
                                <div>
                                    <img src="./lawyer-03.jpg" className="flex lawyer-sm" alt="Brigida R." />
                                </div>
                                <div>
                                    <h2>Brigida R.</h2>
                                    <p className="location">Dallas, TX</p>
                                    <p className="category">Family Law</p>
                                </div>
                            </div>
                            <div className="flex flex-row items-center gap-3">
                                <div>
                                    <h3>Rating (29 users)</h3>
                                </div>
                                <div className="w-[78px] grid grid-cols-5 gap-1">
                                    <div className="star"></div>
                                    <div className="star"></div>
                                    <div className="star"></div>
                                    <div className="star"></div>
                                    <div className="star"></div>
                                </div>
                            </div>
                            <div className="flex flex-row">
                                <hr />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex flex-row items-center">
                                    <div className="flex-1"><strong>Overall</strong></div>
                                    <div className="w-[78px] grid grid-cols-5 gap-1">
                                        <div className="star"></div>
                                        <div className="star"></div>
                                        <div className="star"></div>
                                        <div className="star"></div>
                                        <div className="star"></div>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center">
                                    <div className="flex-1">Responded in a timely manner</div>
                                    <div className="w-[78px] grid grid-cols-5 gap-1">
                                        <div className="star"></div>
                                        <div className="star"></div>
                                        <div className="star"></div>
                                        <div className="star"></div>
                                        <div className="star-gray"></div>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center">
                                    <div className="flex-1">Answered questions clearly</div>
                                    <div className="w-[78px] grid grid-cols-5 gap-1">
                                        <div className="star"></div>
                                        <div className="star"></div>
                                        <div className="star"></div>
                                        <div className="star"></div>
                                        <div className="star"></div>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center">
                                    <div className="flex-1">Understood needs</div>
                                    <div className="w-[78px] grid grid-cols-5 gap-1">
                                        <div className="star"></div>
                                        <div className="star"></div>
                                        <div className="star"></div>
                                        <div className="star"></div>
                                        <div className="star-gray"></div>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center">
                                    <div className="flex-1">Gave complete and clear information</div>
                                    <div className="w-[78px] grid grid-cols-5 gap-1">
                                        <div className="star"></div>
                                        <div className="star"></div>
                                        <div className="star"></div>
                                        <div className="star"></div>
                                        <div className="star"></div>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center">
                                    <div className="flex-1">Knowledgeable in legal area</div>
                                    <div className="w-[78px] grid grid-cols-5 gap-1">
                                        <div className="star"></div>
                                        <div className="star"></div>
                                        <div className="star"></div>
                                        <div className="star"></div>
                                        <div className="star-gray"></div>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center">
                                    <div className="flex-1">Good value for money</div>
                                    <div className="w-[78px] grid grid-cols-5 gap-1">
                                        <div className="star"></div>
                                        <div className="star"></div>
                                        <div className="star"></div>
                                        <div className="star"></div>
                                        <div className="star"></div>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center">
                                    <div className="flex-1">Would hire again</div>
                                    <div className="w-[78px] grid grid-cols-5 gap-1">
                                        <div className="star"></div>
                                        <div className="star"></div>
                                        <div className="star"></div>
                                        <div className="star"></div>
                                        <div className="star-gray"></div>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center">
                                    <div className="flex-1">Would recommend to friend</div>
                                    <div className="w-[78px] grid grid-cols-5 gap-1">
                                        <div className="star"></div>
                                        <div className="star"></div>
                                        <div className="star"></div>
                                        <div className="star"></div>
                                        <div className="star"></div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <hr />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex flex-row items-center gap-3">
                                    <div className="w-[78px] grid grid-cols-5 gap-1">
                                        <div className="star"></div>
                                        <div className="star"></div>
                                        <div className="star"></div>
                                        <div className="star"></div>
                                        <div className="star"></div>
                                    </div>
                                    <div className="flex-1">by Dexter Marshall, 06/10/2016</div>
                                </div>
                                <div>
                                    <p>Deb did a great job. Got my bench warrant set aside ... was sure I was going to jail ... phew. Judge seemed to respect her.</p>
                                </div>
                            </div>
                            <div className="close" onClick={() => setShowClientReviews(false)}></div>
                            <div className="text-right"><a onClick={() => setShowClientReviews(false)}>CLOSE</a></div>
                        </div>
                    </div>
                )
            }
            <div id="top" className="flex 1200px:flex-row flex-col items-center justify-between">
                <div className="flex flex-col md:flex-row gap-3 items-center md:items-end">
                    <div className="logo"></div>
                    <div className="slogan">FIND THE RIGHT LAWYER NOW</div>
                </div>
                <div>
                    <ul>
                        <li>No fee to present your case</li>
                        <li>Choose from lawyers in your area</li>
                        <li>A 100% confidential service</li>
                    </ul>
                </div>
            </div>
            <header className="flex flex-col md:flex-row">
                <div className="container mx-auto">
                    <h1 className="mb-1 ml-2">Find a Lawyer for your Legal Issue</h1>
                    <h3 className="ml-2">Fast, Free and Confidential</h3>
                    <div className="flex flex-col md:flex-row gap-10">
                        <div className="relative w-full md:w-1/2 mt-10">
                            <p className="mb-2 ml-2">Enter Zip Code or City:</p>
                            <div className="input flex flex-row gap-5 items-center">
                                <div className="step flex items-center justify-center">1</div>
                                <input
                                    type="text"
                                    placeholder="Does not have to be where you live"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                            </div>
                            {
                                showLocations && searchTerm && (
                                    <div className="locations">
                                        {
                                            filteredData.length > 0 ? (
                                                filteredData.map((item, index) => (
                                                    <div key={index} className="location py-1" onClick={() => handleSelectLocation(item.city + ' ' + item.zip)}>
                                                        {item.city} - {item.zip}
                                                    </div>
                                                ))
                                            ) : (
                                                <div>No results found</div>
                                            )
                                        }
                                    </div>
                                )
                            }
                            <p className="mt-7 mb-2 ml-2">Choose a category:</p>
                            <div className="input flex flex-row gap-5 items-center">
                                <div className="step flex items-center justify-center">2</div>
                                <input type="text" placeholder="Click to choose a legal category" />
                                <div className="expand" ref={divRef} onClick={handleExpand}></div>
                            </div>
                            {
                                expand && (
                                    <div className="categories">
                                        <ul>
                                            {
                                                categories.map((cat: Category) => (
                                                    <li onClick={() => handleShowCaseTypes(cat.id)} key={cat.id}>{cat.name}</li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                )
                            }
                            <h4 className="flex mt-5 justify-center"><Link to="#">Can't find your category? Click here.</Link></h4>
                        </div>
                        <div id="reviews" className="w-full md:w-1/2">
                            <h4 className="mt-0 mb-7">Clients review LegalMatch lawyers</h4>
                            <div className="flex flex-col gap-3">
                                <div className="flex flex-row gap-3">
                                    <div className="flex flex-col w-[90px] items-center">
                                        <img src="./lawyer-01.jpg" className="flex lawyer" alt="Mitchell M." />
                                        <h5 className="mt-1 mb-0 text-center">Mitchell M.<span>Cherry Hill, NJ</span></h5>
                                    </div>
                                    <div className="flex-1">
                                    <div className="flex flex-row gap-3 md:gap-6">
                                            <div className="flex flex-1">
                                                <h6 className="mb-3">Family Law</h6>
                                            </div>
                                            <div className="w-[78px] grid grid-cols-5 gap-1">
                                                <div className="star"></div>
                                                <div className="star"></div>
                                                <div className="star"></div>
                                                <div className="star"></div>
                                                <div className="star"></div>
                                            </div>
                                        </div>
                                        <p className="review">"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pellentesque sem eu massa egestas consequat id in justo. Fusce massa sapien, interdum malesuada dignissim eget, sollicitudin et elit. Integer eu ante ultrices ...</p>
                                        <p className="read mt-3 mr-3 text-right" onClick={() => handleShowClientReviews()}>Read Review</p>
                                    </div>
                                </div>
                                <div><hr /></div>
                                <div className="flex flex-row gap-3">
                                    <div className="flex flex-col w-[90px] items-center">
                                        <img src="./lawyer-02.jpg" className="flex lawyer" alt="Joel C." />
                                        <h5 className="mt-1 mb-0 text-center">Joel C.<span>Little Rock, AR</span></h5>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex flex-row gap-3 md:gap-6">
                                            <div className="flex flex-1">
                                                <h6 className="mb-3">Job &amp; Employment Law</h6>
                                            </div>
                                            <div className="w-[78px] grid grid-cols-5 gap-1">
                                                <div className="star"></div>
                                                <div className="star"></div>
                                                <div className="star"></div>
                                                <div className="star"></div>
                                                <div className="star"></div>
                                            </div>
                                        </div>
                                        <p className="review">"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pellentesque sem eu massa egestas consequat id in justo. Fusce massa sapien, interdum malesuada dignissim eget, sollicitudin et elit. Integer eu ante ultrices ...</p>
                                        <p className="read mt-3 mr-3 text-right" onClick={() => handleShowClientReviews()}>Read Review</p>
                                    </div>
                                </div>
                                <div><hr /></div>
                                <div className="flex flex-row gap-3">
                                    <div className="flex flex-col w-[90px] items-center">
                                        <img src="./lawyer-03.jpg" className="flex lawyer" alt="Brigida R.." />
                                        <h5 className="mt-1 mb-0 text-center">Brigida R.<span>Dallas, TX</span></h5>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex flex-row gap-3 md:gap-6">
                                        <div className="flex flex-1">
                                                <h6 className="mb-3">Family Law</h6>
                                            </div>
                                            <div className="w-[78px] grid grid-cols-5 gap-1">
                                                <div className="star"></div>
                                                <div className="star"></div>
                                                <div className="star"></div>
                                                <div className="star"></div>
                                                <div className="star"></div>
                                            </div>
                                        </div>
                                        <p className="review">"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pellentesque sem eu massa egestas consequat id in justo. Fusce massa sapien, interdum malesuada dignissim eget, sollicitudin et elit. Integer eu ante ultrices ...</p>
                                        <p className="read mt-3 mr-3 text-right" onClick={() => handleShowClientReviews()}>Read Review</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <footer className="flex flex-col lg:flex-row items-center lg:items-baseline gap-10">
                <div className="logo"></div>
                <div className="menu flex flex-col flex-1 gap-12 items-center">
                    <div>
                        <ul className="mt-3 text-center">
                            <li className="block lg:inline-block"><Link to="#">User Agreement</Link></li>
                            <li className="block lg:inline-block sep"></li>
                            <li className="block lg:inline-block"><Link to="#">Privacy Policy</Link></li>
                            <li className="block lg:inline-block sep"></li>
                            <li className="block lg:inline-block"><Link to="#">Site Map</Link></li>
                        </ul>
                    </div>
                    <div>
                        <p className="text-center">
                            Copyright &copy; 1999-2024 LegalMatch. All Rights Reserved. LegalMatch&reg;,<br />
                            the LegalMatch logo, and the tradedress are trademarks of LegalMatch. Patents Pending.
                        </p>
                    </div>
                </div>
                <div className="partners flex flex-row lg:flex-col gap-5 items-end">
                    <Link to="#"><img src="./logo-truste.jpg" alt="TRUSTe Verified" /></Link>
                    <Link to="#"><img src="./logo-bbb.jpg" alt="BBB Rating: A+" /></Link>
                </div>
            </footer>
        </>
    )
}

export default Home;
