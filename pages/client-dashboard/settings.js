import { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const settingsData = {
  visitorTypes: [
    { title: 'Visitor', description: 'A person who pays a visit; guest, tourist, etc.' },
    { title: 'Contractor', description: 'A person who contracts to perform work or provide supplies at a certain price or within a certain time.' },
    { title: 'Temporary', description: '' },
  ],
  visitorIdTypes: [
    { title: 'AADHAR' },
    { title: 'PAN' },
    { title: 'DL' },
    { title: 'OTHER (GOVT. ID)' },
    { title: 'VOTER ID' },
  ],
  purposes: [
    { title: 'MEETING', description: 'Meeting people to discuss one or more topics.' },
    { title: 'INTERVIEW', description: 'A structured conversation where one participant asks questions, and the other provides answers.' },
    { title: 'EVENTS', description: 'A meeting of a seminar or a room for such meeting.' },
    { title: 'DELIVERY', description: 'Some person comes with material or things for delivery.' },
    { title: 'HOUSEKEEPING WORK' },
    { title: 'CASUAL DUTY', description: 'Some person comes through for work as one day.' },
    { title: 'Vendors' },
    { title: 'Contractor', description: 'As contract basis.' },
    { title: 'Network checking work' },
    { title: 'ALL SETUP' },
    { title: 'FOOD TRAIL', description: 'Come to kitchen interview.' },
    { title: 'KST WORK' },
    { title: 'INSULATION', description: 'Insulation of any kind of substance.' },
    { title: 'LIGHT & TRUSS', description: 'To an area given by.' },
    { title: 'Banquet work' },
    { title: 'STAGE SETUP', description: 'TP setup an area given by.' },
    { title: 'SOUND SETUP', description: 'To an area given by.' },
    { title: 'PAINTING', description: 'Painting wall.' },
    { title: 'EXTRA DRIVER', description: 'Driving cars as for guest.' },
    { title: 'TRAINEE, JOINING', description: 'Student come for personality development.' },
  ],
  departments: [
    { title: 'Security' },
    { title: 'Food & Beverage' },
    { title: 'Kitchen' },
    { title: 'Materials' },
    { title: 'Purchase' },
    { title: 'Human Resource' },
    { title: 'Banquet' },
    { title: 'Engineering' },
    { title: 'Front Office' },
    { title: 'Information Technology' },
    { title: 'Housekeeping' },
    { title: 'Sales & Marketing' },
    { title: 'Other Stores' },
    { title: 'Kitchen Stewarding' },
    { title: 'FINANCE' },
    { title: 'Spa Manager J Wellness Circle' },
    { title: 'LOUNDRY' },
    { title: 'VALETS' },
    { title: 'RARE RABBIT', description: 'Shop visit by area.' },
    { title: 'SHAZE SHOP', description: 'Cars showroom sales.' },
  ],
  company: [
    { title: 'Company 1' },
    { title: 'Company 2' },
    { title: 'Company 3' },
    // Add more company data here
  ],
};

const Settings = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Setting</h1>
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList className="flex border-b border-gray-200 mb-4">
          <Tab className="mr-4 pb-2 cursor-pointer">Visitor Types</Tab>
          <Tab className="mr-4 pb-2 cursor-pointer">Visitor ID Types</Tab>
          <Tab className="mr-4 pb-2 cursor-pointer">Purposes</Tab>
          <Tab className="mr-4 pb-2 cursor-pointer">Departments</Tab>
          <Tab className="mr-4 pb-2 cursor-pointer">Company</Tab>
        </TabList>

        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {settingsData.visitorTypes.map((type, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-bold">{type.title}</h2>
                <p className="text-sm text-gray-600">{type.description}</p>
              </div>
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {settingsData.visitorIdTypes.map((idType, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-bold">{idType.title}</h2>
              </div>
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {settingsData.purposes.map((purpose, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-bold">{purpose.title}</h2>
                <p className="text-sm text-gray-600">{purpose.description}</p>
              </div>
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {settingsData.departments.map((department, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-bold">{department.title}</h2>
                <p className="text-sm text-gray-600">{department.description}</p>
              </div>
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {settingsData.company.map((company, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-bold">{company.title}</h2>
              </div>
            ))}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Settings;

