﻿const Parser = require('binary-parser').Parser;

// Category    = Hardware Configuration
// Object      = Cellmon
// MsgLength   = 54
// Description = Hardware cellmon setup configuration
// Version     = 6
// Frequency   = 30 seconds
// Valid from  = SW 2.15
const status = new Parser()
    .skip(8)
    .uint8('HwCellmonSetupVers') // index 8
    .uint8('HwCellmonBattTypeID')  /* BattTypes
            Custom              = 0,
            Li-FePO4 Typical    = 1,
            Li-Ion Performance  = 2,
            Li-Ion LongLife     = 3,
            Li-FePO4 Longlife   = 4, */
    .uint8(  'HwCellmonFirstID') // index 10
    .uint8(  'HwCellmonLastID')  // index 11
    .int16le('HwCellmonNomCellVolt',        { formatter: (x) => {return x/1000;}}) // index 12
    .int16le('HwCellmonLoCellVolt',         { formatter: (x) => {return x/1000;}}) // index 14
    .int16le('HwCellmonHiCellVolt',         { formatter: (x) => {return x/1000;}}) // index 16
    .int16le('HwCellmonBypassVoltLevel',    { formatter: (x) => {return x/1000;}}) // index 18
    .int16le('HwCellmonBypassAmpLimit',     { formatter: (x) => {return x/1000;}}) // index 20 - ampere
    .uint8( 'HwCellmonBypassTempLimit',     { formatter: (x) => {return x-40;}}) // index 22 - temperature ºC
    .uint8( 'HwCellmonLoCellTemp',          { formatter: (x) => {return x-40;}}) // index 23 - temperature ºC
    .uint8( 'HwCellmonHiCellTemp',          { formatter: (x) => {return x-40;}}) // index 24 - temperature ºC
    .uint8( 'HwCellmonDiffNomCellsInSeries')    // Boolean 0 = Off , 1 = On 
    .uint8( 'HwCellmonNomCellsInSeries')
    .uint8( 'HwCellmonAllowEntireRange')        // Boolean 0 = Off , 1 = On
    .uint8( 'HwCellmonEntireFirstID')
    .uint8( 'HwCellmonEntireLastID')
    .uint8( 'HwCellmonBypassExtraMode')  /* BypassExtraModes
            None            = 0,
            Idle Shunt      = 1,
            Same CellVolt   = 2,
            AutoLevel       = 3, */
    .int16le('HwCellmonBypassExtraInterval',        { formatter: (x) => {return x/1000;}})  // index 31 - seconds
    .uint8(  'HwCellmonCellMonTypeID')  /* CellMonTypes
            Custom      = 0,
            GenMon 2W   = 1,
            GenMon 8W   = 2,
            LongMon     = 3,
            BlockMonM8  = 4,
            BlockMonM14 = 5,
            EndMon      = 6,
            ManyMon     = 7, */
    .floatle('HwCellmonBypassImpedance',            { formatter: (x) => {return x/1000;}})  // index 34
    .int16le('HwCellmonBypassLoVoltCutout',         { formatter: (x) => {return x/1000;}})  // index 38
    .int16le('HwCellmonBypassShuntChargeLimit',     { formatter: (x) => {return x/100;}})   // index 40 - amps
    .int16le('HwCellmonBypassShuntDischgLimit',     { formatter: (x) => {return x/100;}})   // index 42 - amps
    .uint8(  'HwCellmonBypassShuntSocLo',           { formatter: (x) => {return (x-5)/2;}}) // index 44 - percent
    .int16le('HwCellmonBypassCellVoltBanding',      { formatter: (x) => {return x/1000;}})  // index 45
    .int16le('HwCellmonBypassCellVoltDiff',         { formatter: (x) => {return x/1000;}})  // index 47
    .int16le('HwCellmonBypassStableInterval',       { formatter: (x) => {return x/1000;}})  // index 49 - seconds
    .int16le('HwCellmonBypassExtraAmpLimit',        { formatter: (x) => {return x/1000;}})  // index 51 - amps
    .uint8( 'HwCellmonLoIgnoreTemp',                { formatter: (x) => {return x-40;}})    // index 53 - temperature ºC

module.exports = function(msg)
{
    return status.parse(msg);
}
