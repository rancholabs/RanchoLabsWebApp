#include <iostream>
#include <bits/stdc++.h>

using namespace std;

int main()
{
    int x1=21, v1=6, x2=47, v2=3;
    double n = double(x1-x2)/double(v2-v1);

    cout<<n<<endl;
    cout<<"Ceil= "<<ceil(n)<<"\n"<<"Floor = "<<floor(n)<<endl;

    if(n>0 && ceil(n) == floor(n))
    cout<< "YES";
    else
    cout<< "NO";
    return 0;
}
