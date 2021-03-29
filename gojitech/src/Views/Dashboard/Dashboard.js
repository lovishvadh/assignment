import React, { useState, useEffect } from 'react';
import Button from '@atlaskit/button';
import  Form, { Field, FormFooter, HelperMessage } from '@atlaskit/form';
import Textfield from '@atlaskit/textfield';
import { searchForUser, updateDateStore } from '../../ApiService';
import { storeUsername } from '../../ApiService/auth';

function Dashboard() {
    const [searchQueries, setSearchQueries] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);

useEffect(() => {
 
  return () => {};
}, [])

const onSearch = async (formData) => {
    setLoading(true);
    const searchQuery = formData['search-query'];
    if(searchQuery) {
      setSearchQuery(searchQuery);
      const searchData = await searchForUser(searchQuery);
      setSearchQueries(searchData.data);
    }
    setLoading(false);
}

const onItemSelect = async (query) => {
    setLoading(true);
    const res = await storeUsername(query);
    if(res.status) {
      setSearchQueries([]);
      setSearchQuery("");
      alert("Channel added to list of streams.");
    } else {
      alert("Couldn't add channel. Please try later.");
    }
    setLoading(false);
  }

  return (
    <div style={{display: "flex", width: "100vw", height: "100vh", flexDirection :"column", alignItems: "center"}}>
      <Form
      style={{width: "80%"}}
      onSubmit={onSearch}
    >
      {({ formProps }) => (
        <form {...formProps}  style={{width: "80%"}}>
          <Field name="search-query">
            {({ fieldProps }) => (
              <>
                <Textfield
                  placeholder="Search for a channel"
                  {...fieldProps}
                />
              </>
            )}
          </Field>
          <FormFooter>
            {!loading && <Button type="submit" appearance="primary">
              Search
            </Button>}
            {loading && <img src={'/loading.gif'} />}
          </FormFooter>
        </form>
      )}
    </Form>
    {!loading && searchQueries.map((query) => <div onClick={() => onItemSelect(query)} style={{ border: query.display_name === searchQuery ? '4px solid gold' : "none", width: "80%", padding: "20px", margin: "10px", position:"relative", borderRadius: "5px" ,alignItems:"center", display:"flex", boxShadow: `0px 0px 3px 0px rgba(0,0,0,0.5)` }} key={query.id}>
        <img style={{ width: "50px"}} src={ query.thumbnail_url }></img>
        <span style={{padding:"10px", fontWeight: "600", textTransform: "capitalize"}}>{query.display_name}</span>
        {query.is_live && <div style={{ backgroundColor: "red" , position: "absolute", top: "10px", right: "10px", width: "20px", height:"20px", borderRadius:"20px"}}></div>}
    </div>)}
    </div>
  );
}

export default Dashboard;