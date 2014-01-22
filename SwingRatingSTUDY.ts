# SWINGRATING
# WGRIFFITH2 (C) 2013

def PAINTBARS = yes;

# STOCHASTICSLOW
def KPERIOD = 14;
def DPERIOD = 3;
def FASTLINE = Round(SimpleMovingAvg(100 * ((close - Lowest(low, KPERIOD)) / (Highest(high, KPERIOD) - Lowest(low, KPERIOD))), LENGTH = DPERIOD));
def SLOWLINE = Round(SimpleMovingAvg(SimpleMovingAvg(100 * ((close - Lowest(low, KPERIOD)) / (Highest(high, KPERIOD) - Lowest(low, KPERIOD))), LENGTH = DPERIOD), LENGTH = DPERIOD));

# MACD
def MACD = MACDHistogram("FAST LENGTH" = 5, "SLOW LENGTH" = 35, "MACD LENGTH" = 5);

#def RSI = RSIWilder(PRICE = CLOSE, LENGTH = 14);
#def SMA = SimpleMovingAvg(PRICE = RSI, LENGTH = 12);

def GREENPRICE = #RSI >= SMA and 
MACD >= 0 and
FASTLINE >= SLOWLINE;
def REDPRICE = #RSI < SMA and
MACD < 0 and
FASTLINE < SLOWLINE;

plot BULLISH =
#BIG MOVE GREEN
if GREENPRICE
and Lowest(FASTLINE, 3) < 20
and close > SimpleMovingAvg()
and close > close[1]
then 1
#SMALL MOVE GREEN
else if GREENPRICE
and Lowest(FASTLINE, 3) < 20
and close > close[1]
then .9
# TRENDING GREEN
ELSE if GREENPRICE
and close > close[1]
then .8
#BIG MOVE BLUE
else if !GREENPRICE
and !REDPRICE
and Lowest(FASTLINE, 3) < 20
and close > SimpleMovingAvg()
and close > close[1] 
then .7
#SMALL MOVE BLUE
else if !GREENPRICE
and !REDPRICE
and Lowest(FASTLINE, 3) < 20
and close > close[1]
then .6
# TRENDING BLUE
ELSE if !GREENPRICE
and !REDPRICE
and close > close[1]
then .5
# UNCONFIRMED RED
ELSE if !GREENPRICE
and close > close[1]
and Lowest(FASTLINE, 3) < 20
then .25
# CONFLICTING RED
ELSE if !GREENPRICE
and close > close[1]
then .15
else 0;

BULLISH.SetDefaultColor(CreateColor(0, 255, 0));
BULLISH.SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);