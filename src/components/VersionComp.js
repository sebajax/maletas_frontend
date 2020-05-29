// Node Modules imports
import React from 'react';

// Config
import version from '../config/Version';

const VersionComp = () => (
    <div style={{opacity: "0.1"}}>
        <div className="d-flex justify-content-center mt-5">
            {version.APP} v{version.VERSION}
        </div>
        <div className="d-flex justify-content-center">
           {version.DEV}
        </div>
    </div>
);

export default VersionComp;