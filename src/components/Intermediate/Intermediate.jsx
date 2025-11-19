import { useNavigate } from 'react-router-dom';
import challenges from '../../challenges.json';
import Nav from '../Nav';

const Intermediate = () => {
    const navigate = useNavigate();

    return (
        <>
            <Nav />
            <section className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-slate-900 text-gray-800 dark:text-white px-4">
                <div className="text-center mb-6">
                    <img
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png"
                        alt="Charmeleon"
                        className="w-28 h-28 mx-auto animate-float drop-shadow-[0_4px_12px_rgba(239,68,68,0.5)] rotate-[1deg] transition-transform duration-300 hover:scale-110"
                    />


                    <h1 className="text-4xl font-bold mt-2">Intermediate Challenges</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Level up your skills with these challenges!
                    </p>
                </div>

                <div className="w-full max-w-md bg-slate-200 dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden">
                    <ul className="max-h-96 overflow-y-auto p-4 thin-scrollbar divide-y divide-slate-300 dark:divide-slate-700">
                        {challenges?.intermediate?.map((challenge) => (
                            <li key={challenge.id}>
                                <button
                                    onClick={() => navigate(challenge.href)}
                                    className="w-full cursor-pointer text-left py-3 px-4 text-lg font-medium rounded-lg hover:bg-red-400 hover:text-white transition"
                                >
                                    {challenge.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    );
};

export default Intermediate;
