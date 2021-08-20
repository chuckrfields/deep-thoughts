import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS } from '../utils/queries';
import ThoughtList from '../components/ThoughtList';

const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_THOUGHTS);

  /*
    Working with Promise-based functionality in React can get cumbersome. 
    But with the loading property, we'll be able to conditionally render data based on whether or not there is data to even display.
  */

  const thoughts = data?.thoughts || [];  // Optional chaining negates the need to check if an object even exists before accessing its properties. 
  // if data exists, store it in the thoughts constant we just created. If data is undefined, then save an empty array to the thoughts component.
  console.log(thoughts);

  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className="col-12 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
