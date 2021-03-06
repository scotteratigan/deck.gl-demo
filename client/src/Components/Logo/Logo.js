import React from "react";
import { Spring } from "react-spring/renderprops";
import "./Logo.scss";

export default function Logo() {
  return (
    <div className="logo-container">
      <Spring
        config={{ duration: 1200 }}
        from={{ opacity: 0, height: 0 }}
        to={{ opacity: 1, height: 300 }}
      >
        {props => (
          <svg style={props} viewBox="0 0 400 200">
            <path
              className="logo-letter"
              d="M42.168,122.08846H97.42783a4.598,4.598,0,0,1,4.598,4.598V146.8433a4.598,4.598,0,0,1-4.598,4.598H12.8187a4.598,4.598,0,0,1-4.598-4.598V53.30955a4.598,4.598,0,0,1,4.598-4.598H32.972a4.598,4.598,0,0,1,4.598,4.598v64.18092A4.598,4.598,0,0,0,42.168,122.08846Z"
            />
            <path
              className="logo-letter"
              d="M103.14074,48.71155h33.69435a2.77013,2.77013,0,0,1,1.95878.81136l27.8274,27.8274a2.77013,2.77013,0,0,0,3.91747.00009L198.3689,49.52282a2.77012,2.77012,0,0,1,1.95869-.81127h33.69184a2.77013,2.77013,0,0,1,1.95884,4.72885l-51.91051,51.9139a2.77016,2.77016,0,0,0-.81129,1.95872v41.35814a2.77013,2.77013,0,0,1-2.77013,2.77014H156.67641a2.77013,2.77013,0,0,1-2.77013-2.77014v-41.3581a2.77013,2.77013,0,0,0-.81134-1.95876L101.182,53.44045A2.77013,2.77013,0,0,1,103.14074,48.71155Z"
            />
            <path
              className="logo-letter"
              d="M313.92822,83.72168v62.06063a5.659,5.659,0,0,1-5.659,5.659H290.238a5.659,5.659,0,0,1-5.659-5.659V83.72168a5.659,5.659,0,0,0-5.659-5.659H254.34187a5.659,5.659,0,0,1-5.659-5.659V54.37054a5.659,5.659,0,0,1,5.659-5.659h89.82364a5.659,5.659,0,0,1,5.659,5.659V72.40371a5.659,5.659,0,0,1-5.659,5.659h-24.5783A5.659,5.659,0,0,0,313.92822,83.72168Z"
            />
            <path
              className="period"
              d="M391,130.84949a20.52352,20.52352,0,1,1-6.0111-14.57354A19.80277,19.80277,0,0,1,391,130.84949Z"
            />
          </svg>
        )}
      </Spring>
    </div>
  );
}
