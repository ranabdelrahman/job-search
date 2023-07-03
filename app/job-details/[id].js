import {Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl} from 'react-native';
import { Stack, useRouter, useSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';

import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics} from '../../components';
import { COLORS, icons, SIZES} from '../../constants';
import useFetch from '../../hook/useFetch';

const tabs=["About", "Qualifications", "Responsibilities"];

const jobDetails = () => {
  const params = useSearchParams(); //allows us to get id of job details page we're on
  const router=useRouter();

  const {data, isLoading, error, refetch}= useFetch('job-details', {  //gets job-details endpoint instead of search endpoint
    job_id: params.id  //pass in job id 
  })

  const [refreshing, setRefreshing]=useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const onRefresh = useCallback (()=>{
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, [])

  const displayTabContent = () =>{
    switch(activeTab){
        case "Qualifications":
            return <Specifics
                title="Qualifications"
                points  = {data[0].job_highlights?.Qualifications ?? ['N/A'] }  //?? = if it doesn't exist
             />
    
        case "About":
            return <JobAbout
                info={data[0].job_description ?? "No data provided"}
             /> 
        
        case "Responsibilities":
            return <Specifics
                title="Responsibilities"
                points  = {data[0].job_highlights?.Responsibilities ?? ['N/A'] }  //?? = if it doesn't exist
             />
        
        default:
            break;
    }
  }

  return (
    <SafeAreaView sytle={{flex: 1, backgroundColor: COLORS.lightWhite}}>
        <Stack.Screen
            options={{
                headerStyle: {backgroundColor: COLORS.lightWhite},
                headerShadowVisible: false,
                headerBackVisible: false, //hides back button
                headerLeft: ()=>(  //custom back arrow
                    <ScreenHeaderBtn
                        iconUrl={icons.left}
                        dimension="60%"
                        handlePress={()=>router.back()}
                    />
                ),
                headerRight: ()=>(  
                    <ScreenHeaderBtn
                        iconUrl={icons.share}
                        dimension="60%"
                    />
                ),
                headerTitle: '' //removes the header title
            }}
        />

        <>
            <ScrollView showsVerticalScrollIndicator= {true} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}> 
                {isLoading ?(
                    <ActivityIndicator size="large" color={COLORS.primary}/>
                ) : error? (
                    <Text>Something went wrong</Text>
                ) : data.length === 0 ?(
                    <Text>No data</Text>
                ) : (
                    <View style={{padding: SIZES.medium, paddingBottom: 100}}>
                        <Company
                            companyLogo={data[0].employer_logo}
                            jobTitle={data[0].job_title}
                            companyName={data[0].employer_name}
                            Location={data[0].job_country}
                         />

                         <JobTabs
                            tabs={tabs}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                         />

                         {displayTabContent()}
                    </View>
                )
            }
            </ScrollView>

            <JobFooter url={data[0]?.job_google_link ?? 'https://careers.google.com/joobs/results'}/>
        </>
    </SafeAreaView>
  )
}

export default jobDetails