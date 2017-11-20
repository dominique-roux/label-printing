/*
  This original file comes from here:
  https://community.ubnt.com/t5/UniFi-Wireless/RPI-Dashbutton-Turn-RaspberryPI-with-Dymo-LabelWriter-into-a/td-p/1667513
  Copyright belongs to its author

  Changes: Copyright (c) 2017 Agilent Technologies

  License: GPL V2
*/

#include <iostream>
#include <cups/cups.h>
#include <cups/ppd.h>
#include <string>
#include <stdio.h>
#include <map>
#include <exception>

using namespace std;

const char* PrinterName = "DYMO_LabelWriter_450";

class Error: public exception
{
public:
  Error(const string& Message): exception(), Message_(Message) {}
  virtual ~Error() throw() {}
  virtual const char* what() const throw() { return Message_.c_str(); }
private:
  string Message_;
};


map <string, string> gPaperNames;
typedef pair<string, string> str_pair;

int main(int argc, char** argv)
{
  try
  {
    if (argc != 3)
      throw Error("Usage: PrintLabel <ImageName> <pagesize>");

    int num_options = 0;
    cups_option_t*  options = NULL;

    num_options = cupsAddOption("PageSize", argv[2], num_options, &options);
    //num_options = cupsAddOption("scaling", "100", num_options, &options);
    num_options = cupsAddOption("DymoHalftoning", "ErrorDiffusion", num_options, &options);
    num_options = cupsAddOption("DymoPrintQuality", "Graphics", num_options, &options);

    cupsPrintFile(PrinterName, argv[1], "Label", num_options, options);

    cupsFreeOptions(num_options, options);
    fprintf(stdout, "Printed\n");

    return 0;
  }
  catch(std::exception& e)
  {
    fprintf(stdout, "Printer sent an error\n");
    fprintf(stdout, "%s", e.what());
    fprintf(stdout, "\n");
    return 1;
  }
}
