class TopicExtensions
{
    constructor() {
        this.topic = "undefined";
    };

    appendTopic(_custom){
        if (this.topic.endsWith("/")) {
            this.topic = `${this.topic}${_custom}`;
        }
        
        this.topic = `${this.topic}/${_custom}`;
        return this;
    };

    appendMultiLevelWildcard()
    {
        return this.appendTopic("#");
    }
    
    appendSingleLevelWildcard()
    {
        return this.appendTopic("+");
    }

    build(){
        return this.topic;
    }
}

function containsMultiLevelWildcard(_topic)
{
    return _topic.endsWith("#");
}

function containsSingleLevelWildcard(_topic)
{
    return _topic.includes('+');
}

function containsWildcard(_topic)
{
    return containsMultiLevelWildcard(_topic) || containsSingleLevelWildcard(_topic);
}

function getParentTopic(_topic)
{
    return _topic.substring(0, _topic.lastIndexOf('/'));
}

function matchTopic( a, b) {
    const aHasSingleLevel = containsSingleLevelWildcard(a);
    const aHasMultiLevel = containsMultiLevelWildcard(a);
    const bHasSingleLevel = containsSingleLevelWildcard(b);
    const bHasMultiLevel = containsMultiLevelWildcard(b);

    // simple compare
    if (!aHasSingleLevel && !aHasMultiLevel && !bHasSingleLevel && !bHasMultiLevel)
    {
        return a === b;
    }

    // compare with multi-level
    if (!aHasSingleLevel && !bHasSingleLevel)
    {
        var cmpA = aHasMultiLevel ? getParentTopic(a) : a;
        var cmpB = bHasMultiLevel ? getParentTopic(b) : b;
        return (cmpA.length < cmpB.length) ? cmpB.startsWith(cmpA) : cmpA.startsWith(cmpB);
    }
    
    // slowest compare (by topic)
    var tokensA = a.split('/');
    var tokensB = b.split('/');

    // if not multi-level and not equal (already fail)
    if (tokensA.length !== tokensB.length && !aHasMultiLevel && !bHasMultiLevel)
        return false;
    
    // how many rounds
    var rounds = tokensA.length < tokensB.length ? tokensA.length : tokensB.length;

    // check each token if it is a match
    for (var i = 0; i < rounds; i++)
    {
        var ta = tokensA[i];
        var tb = tokensB[i];
 
        if (ta === "#" || tb === "#")
            return true;
        
        if(ta === "+" || tb === "+")
            continue;

        if (ta !== tb)
            return false;
    }
    return true;
}

module.exports = TopicExtensions;
module.exports.matchTopic = matchTopic;
module.exports.containsWildcard = containsWildcard;