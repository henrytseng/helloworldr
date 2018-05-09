/* File appendallmain.cpp */

#include "appendall.h"
#include <stdio.h>

#define SIZE 500

int main(int argc, char * argv[]) {
	char szNewString[SIZE];

	appendall(argc, argv, szNewString, SIZE);
	printf("%s\n", szNewString);
	
	return 0;
}
