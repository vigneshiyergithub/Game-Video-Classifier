import React, { Fragment, useEffect, useState } from 'react';
import FilterContent from './FilterContent';
import VideoContent from './VideoContent';
import firebase from './firebase'

const ContentPage = (props) => {
    const [data, setData] = useState(null);
    const [videoData, setVideoData] = useState(null);
    const [refetch, setRefetch] =  useState(false);
    useEffect(() => {
        const db = firebase.database();
        db.ref('clips')
            .orderByChild("category").equalTo("NA").on('value', (snapshot) => {
                setData(snapshot.val())
            })
    }, [refetch])
    return <Fragment>
        <FilterContent data={data} setVideoData={setVideoData} />
        {
            videoData && <VideoContent videoData={videoData} clearContent={() => {
                setVideoData(null);
                setRefetch(!refetch)
            }} />
        }
    </Fragment>
}


export default ContentPage;