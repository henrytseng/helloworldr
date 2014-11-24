/* File hello.cpp */

#include "hello.h"
#include <stdio.h>

#define SIZE 500

int main(int argc, char * argv[]) {
	char szNewString[SIZE];

	hello(argc, argv, szNewString, SIZE);
	printf("%s\n", szNewString);

	return 0;
}
