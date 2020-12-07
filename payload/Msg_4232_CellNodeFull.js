module.exports = function() 
{ 
	var Parser = require('binary-parser').Parser;

	// Category    = Telemetry
	// Object      = CellNodeItem
	// Description = Cell node - full details
	// MsgLength   = 52
	// Version     = 2
	// Frequency   = 300 mS
	// Support     = Current
	// Valid to    = SW 1.0.29
	this.parse_4232 = function(msg) 
	{		
		var status = new Parser()
		.skip(8)
		.uint8('Cell_ID')
		.uint8('Cell_USN')
		.int16le('Cell_MinCellVolt',			{ formatter: (x) => {return x/1000;}})
		.int16le('Cell_MaxCellVolt',			{ formatter: (x) => {return x/1000;}})
		.uint8('Cell_MinCellTemp',			{ formatter: (x) => {return x-40;}}) // temperature ºC
		.uint8('Cell_BypassTemp',			{ formatter: (x) => {return x-40;}}) // temperature ºC
		.int16le('Cell_BypassAmp', 			{ formatter: (x) => {return x/1000;}})
		.uint8('Cell_DataErrorCounter')
		.uint8('Cell_ResetCounter')
		.uint8('Cell_Status') /* Choices NodeStatuses
				None = 0,
				HighVolt = 1,
				HighTemp = 2,
				Ok = 3,
				Timeout = 4,
				LowVolt = 5,
				Disabled = 6,
				InBypass = 7,
				InitialBypass = 8,
				FinalBypass = 9,
				MissingSetup = 10,
				NoConfig = 11,
				CellOutLimits = 12, */	
		.uint8('Cell_IsOverdue')				// boolean 0 = Off , 1 = On

		.int16le('Cell_LoCellVoltAlert',		{ formatter: (x) => {return x/1000;}})
		.int16le('Cell_HiCellVoltAlert',		{ formatter: (x) => {return x/1000;}})
		.int16le('Cell_BypassVoltLevel',		{ formatter: (x) => {return x/1000;}})
		.int16le('Cell_BypassAmpLimit',		{ formatter: (x) => {return x/1000;}})
		.uint8('Cell_BypassTempLimit',		{ formatter: (x) => {return x-40;}}) // temperature ºC
		.uint8('Cell_HiCellTempAlert',		{ formatter: (x) => {return x-40;}}) // temperature ºC
		.uint8('Cell_RawVoltCalOffset')
		.int16le('Cell_FwVers')
		.int16le('Cell_HwVers')
		.int16le('Cell_BootVers')
		.uint32le('Cell_SerialNo')	
		.uint32le('Cell_BypassInitialDate') 	// Epoch
		.floatle('Cell_BypassSessionAh',		{ formatter: (x) => {return x/1000;}}) // Ah
		.uint8('Cell_RepeatCellV')
		
		return status.parse(msg);
	}
}
