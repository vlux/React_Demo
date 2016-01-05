import csv

f = open("c.txt","r")

data = []
pro =[]
colon = ':'

for line in f.readlines():
	s = line.split()
	temp = s[1]
	s[1] = temp[temp.find(colon) +1:]
	temp = s[2]
	s[2] = temp[temp.find(colon) +1:]
	data.append(s)
	pro.append(s[0])

s = [str(l) for l in data]
_set = set(s)


csvfile = file('c.csv', 'wb')
writer = csv.writer(csvfile)
writer.writerow(['protocol', 'start', 'end','sum'])

ls = []
for item in _set:
	l = eval(item)
	l.append(s.count(item))
	ls.append(l)

ls = sorted(ls, key=lambda x:x[3], reverse=True)

for l in ls[:1000]:
	writer.writerow(l)

csvfile.close()

print 'done'


'''
length = len(data)
flag = [0] * length
ans = []

for i in range(length):
	if not flag[i]:
		flag[i] = 1
		count = 1
		for j in range(i,length):
			if not cmp(data[i],data[j]) and not flag[j]:
				flag[j] = 1
				count += 1
		data[i].append(count)
		ans.append(data[i])

print ans
'''
