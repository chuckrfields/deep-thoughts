import React from 'react';
import { useQuery } from '@apollo/client';
import ThoughtList from '../components/ThoughtList';
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from '../utils/queries';
import Auth from '../utils/auth';
import FriendList from '../components/FriendList';
import ThoughtForm from '../components/ThoughtForm';

const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_THOUGHTS);

  /*
    Working with Promise-based functionality in React can get cumbersome. 
    But with the loading property, we'll be able to conditionally render data based on whether or not there is data to even display.
  */

    // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive
  const { data: userData } = useQuery(QUERY_ME_BASIC);

  const thoughts = data?.thoughts || [];  // Optional chaining negates the need to check if an object even exists before accessing its properties. 
  // if data exists, store it in the thoughts constant we just created. If data is undefined, then save an empty array to the thoughts component.
  console.log(thoughts);

  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className="flex-row justify-space-between">
        {loggedIn && (
          <div className="col-12 mb-3">
            <ThoughtForm />
          </div>
        )}
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
          )}
        </div>
        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Home;
