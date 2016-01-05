import collections
import csv

f = open("c.txt","r")

pro =[]
colon = ':'

for line in f.readlines():
	s = line.split()
	pro.append(s[0]+'-')

csvfile = file('c.csv', 'wb')
writer = csv.writer(csvfile,quoting=csv.QUOTE_NONE)
for l in pro:
	writer.writerow([l,'1'])

csvfile.close()

print 'done'

#counter=collections.Counter(pro)

#print counter.values()
#print counter.keys()
