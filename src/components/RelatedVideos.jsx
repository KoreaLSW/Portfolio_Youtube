import React from 'react';
import { useYoutubeApi } from '../context/YoutubeApiContet';
import { useQuery } from '@tanstack/react-query';
import VideoCard from './VideoCard';

export default function RelatedVideos({ id }) {
    const { youtube } = useYoutubeApi();
    const {
        isLoading,
        error,
        data: videos,
    } = useQuery(['related', id], () => youtube.reatedVideos(id), {
        staleTime: 1000 * 60 * 5,
    });

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p>Something is wrong.....</p>}
            {videos && (
                <ul>
                    {videos.map((video) => {
                        return (
                            <VideoCard
                                key={video.id}
                                video={video}
                                type='list'
                            />
                        );
                    })}
                </ul>
            )}
        </>
    );
}
