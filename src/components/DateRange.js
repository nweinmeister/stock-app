import React from 'react';

import { TextField } from '../../node_modules/@material-ui/core';

const DateRange = (props) => (
  <div>
    <div className="form-group">
      <TextField
        id="startDate"
        label="Start Date"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        value={props.startDate}
        onChange={props.handleChange('startDate')}
        margin="normal"
      />
    </div>
    <div className="form-group">
      <TextField
        id="endDate"
        label="End Date"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        value={props.endDate}
        onChange={props.handleChange('endDate')}
        margin="normal"
      />
    </div>
  </div>
)

export {DateRange};