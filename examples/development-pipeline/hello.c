/* File: hello.c */

#include <stdio.h>
#include <string.h>

void hello(int iArgCount, char * iArgs[], char * szReturnBuffer, int iSize) {
	int i = 0;

	for(i=0; i<iArgCount; i++) {
		if((strlen(szReturnBuffer) + strlen(iArgs[i])) < iSize) {
			strcat(szReturnBuffer, iArgs[i]);
			strcat(szReturnBuffer, " ");
		} else {
			printf("Error: exceeded buffer size\n");
			break;
		}
	}
}
