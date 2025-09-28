export interface BlogPost {
  id: string;
  image: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  date: string;
  category: string;
  readTime: string;
  author?: string;
  authorImage?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "giz-dr-petra-warnecke-lagos-digital-innovation-hubs",
    image: "/blog/image_one.png",
    title: "GIZ's Dr. Petra Warnecke in Lagos: Digital Innovation Hubs Driving African Entrepreneurship",
    description: "GIZ Nigeria & West Africa recently hosted Dr. Petra Warnecke to an engaging fireside chat on the transformative power of digital innovation hubs in Africa.",
    tags: ["Training", "Innovation", "Africa"],
    date: "15 Jun",
    category: "Innovation",
    readTime: "5min",
    author: "DigiPlus Alliance",
    content: `
      <p>GIZ Nigeria & West Africa recently hosted Dr. Petra Warnecke to an engaging fireside chat on the transformative power of digital innovation hubs in Africa. The event, held at our Lagos office, brought together stakeholders from across the ecosystem to discuss the critical role these hubs play in nurturing entrepreneurship and driving economic growth.</p>
      
      <h2>The Power of Digital Innovation Hubs</h2>
      <p>Dr. Warnecke, a renowned expert in digital transformation and innovation ecosystems, shared her insights on how digital hubs are becoming the backbone of Africa's entrepreneurial landscape. "These hubs are not just co-working spaces," she emphasized, "they are catalysts for change, bringing together entrepreneurs, investors, and support organizations to create sustainable solutions for local challenges."</p>
      
      <h2>Key Insights from the Discussion</h2>
      <p>During the fireside chat, several key themes emerged:</p>
      <ul>
        <li><strong>Local Solutions for Local Problems:</strong> The most successful startups emerging from African hubs are those addressing uniquely African challenges with innovative, locally-relevant solutions.</li>
        <li><strong>Ecosystem Collaboration:</strong> The importance of creating interconnected networks between hubs, government, academia, and the private sector.</li>
        <li><strong>Capacity Building:</strong> The critical need for continuous skill development and mentorship programs to support emerging entrepreneurs.</li>
      </ul>
      
      <h2>The DigiPlus Alliance Approach</h2>
      <p>As part of the discussion, we shared our own approach at DigiPlus Alliance, highlighting how our digital hub model focuses on:</p>
      <ul>
        <li>Providing access to cutting-edge digital tools and technologies</li>
        <li>Facilitating connections between startups and potential investors</li>
        <li>Offering comprehensive training programs tailored to market needs</li>
        <li>Creating platforms for knowledge sharing and collaboration</li>
      </ul>
      
      <h2>Looking Forward</h2>
      <p>The conversation concluded with a forward-looking discussion on the future of digital innovation hubs in Africa. Dr. Warnecke emphasized the need for continued investment in infrastructure, education, and policy frameworks that support entrepreneurship.</p>
      
      <p>"The next decade will be crucial for Africa's digital transformation," she noted. "The hubs we build today will determine the continent's ability to compete in the global digital economy tomorrow."</p>
      
      <p>We're grateful to Dr. Warnecke for sharing her valuable insights and to all participants who made this event a success. Stay tuned for more events and discussions as we continue to build Africa's digital future together.</p>
    `
  },
  {
    id: "msme-street-journey-learnings",
    image: "/blog/blog_2.png",
    title: "A Journey Through the Streets: What MSMEs Taught Us",
    description: "Between March 4 and 21, 2025, DigiPlus Alliance Digital Hub embarked on an intensive field study to understand the real challenges facing Micro, Small, and Medium Enterprises (MSMEs) in Lagos.",
    tags: ["Research", "MSMEs", "Field Study"],
    date: "21 Mar",
    category: "Research",
    readTime: "7min",
    author: "DigiPlus Research Team",
    content: `
      <p>Between March 4 and 21, 2025, the DigiPlus Alliance Digital Hub embarked on an intensive field study to understand the real challenges facing Micro, Small, and Medium Enterprises (MSMEs) in Lagos. Our team hit the streets, visited markets, and engaged directly with business owners to gain firsthand insights into their daily operations, challenges, and aspirations.</p>
      
      <h2>The Journey Begins</h2>
      <p>Our research methodology was deliberately immersive. Rather than conducting surveys from air-conditioned offices, we chose to embed ourselves in the communities where these businesses operate. From the bustling Computer Village in Ikeja to the textile markets of Balogun, our team spent hours observing, listening, and learning.</p>
      
      <h2>Key Findings</h2>
      
      <h3>1. Digital Divide is Real but Bridgeable</h3>
      <p>While many MSME owners expressed interest in digitizing their operations, the gap between aspiration and implementation remains significant. We found that:</p>
      <ul>
        <li>78% of businesses still rely primarily on cash transactions</li>
        <li>Only 34% have any form of digital record-keeping system</li>
        <li>65% own smartphones but use less than 20% of their capabilities for business</li>
      </ul>
      
      <h3>2. Trust and Relationships Trump Technology</h3>
      <p>One of our most significant discoveries was the paramount importance of personal relationships in business transactions. Technology solutions that ignore this fundamental aspect are doomed to fail. Successful digital adoption must enhance, not replace, the human connections that drive these businesses.</p>
      
      <h3>3. Financial Inclusion Remains a Major Barrier</h3>
      <p>Access to formal financial services continues to be a critical challenge:</p>
      <ul>
        <li>47% of business owners have never applied for a bank loan</li>
        <li>Among those who have applied, 62% were rejected</li>
        <li>Alternative financing options are either unknown or perceived as too risky</li>
      </ul>
      
      <h2>Voices from the Field</h2>
      <blockquote>
        <p>"I want to grow my business, but every time I try to get help from banks, they ask for documents I don't have or guarantees I can't provide."</p>
        <cite>- Amina, Fashion Designer, Alaba Market</cite>
      </blockquote>
      
      <blockquote>
        <p>"My customers trust me because they can see me, touch the products, and know where to find me. How do I move online without losing that trust?"</p>
        <cite>- Chidi, Electronics Retailer, Computer Village</cite>
      </blockquote>
      
      <h2>Surprising Innovations</h2>
      <p>Despite the challenges, we were amazed by the ingenious solutions business owners had developed:</p>
      <ul>
        <li>A cobbler who uses WhatsApp to send photos of repaired shoes to customers</li>
        <li>A food vendor who created a customer loyalty system using a simple notebook and stamps</li>
        <li>A tailoring shop that uses Instagram to showcase designs and attract younger customers</li>
      </ul>
      
      <h2>What This Means for DigiPlus Alliance</h2>
      <p>These findings have fundamentally shaped our approach to supporting MSMEs:</p>
      
      <h3>1. Simplicity Over Sophistication</h3>
      <p>Our solutions must be intuitive and require minimal learning curves. Complex systems, no matter how feature-rich, will not achieve adoption if they're difficult to use.</p>
      
      <h3>2. Community-Centric Approach</h3>
      <p>We're designing our programs to work within existing social structures rather than trying to replace them. This includes peer-to-peer learning models and community champion programs.</p>
      
      <h3>3. Gradual Digital Integration</h3>
      <p>Rather than pushing for complete digital transformation, we're focusing on helping businesses identify and implement one digital tool at a time, building confidence and skills progressively.</p>
      
      <h2>Moving Forward</h2>
      <p>This street-level research has reinforced our belief that sustainable digital transformation must be built from the ground up, with deep understanding and respect for existing business practices and community dynamics.</p>
      
      <p>We're now developing targeted programs based on these insights, including:</p>
      <ul>
        <li>Mobile digital literacy workshops conducted in local languages</li>
        <li>Peer mentorship programs connecting digitally advanced MSMEs with newcomers</li>
        <li>Simplified financial management tools designed specifically for informal businesses</li>
        <li>Community-based support networks for ongoing assistance</li>
      </ul>
      
      <p>The streets taught us that technology is not the destination—it's a vehicle to help these remarkable entrepreneurs reach their goals. Our job is to make that vehicle accessible, reliable, and aligned with their journey.</p>
    `
  },
  {
    id: "digital-hubs-empowering-startups-africa",
    image: "/blog/blog_3.png",
    title: "How Digital Hubs Are Empowering Startups in Africa",
    description: "The DigiPlus Alliance hub supported by EU and Germany is at the forefront of a digital revolution sweeping across Africa, providing unprecedented opportunities for startups and entrepreneurs.",
    tags: ["Startups", "Digital Hubs", "Africa", "Empowerment"],
    date: "03 Jun",
    category: "News",
    readTime: "3min",
    author: "DigiPlus Alliance",
    content: `
      <p>The DigiPlus Alliance hub supported by EU and Germany is at the forefront of a digital revolution sweeping across Africa, providing unprecedented opportunities for startups and entrepreneurs to transform their innovative ideas into scalable businesses.</p>
      
      <h2>The African Startup Ecosystem</h2>
      <p>Africa's startup ecosystem has experienced remarkable growth in recent years, with total funding reaching record highs and more entrepreneurs than ever before launching innovative ventures. Digital hubs have played a crucial role in this transformation, serving as incubators for the next generation of African tech leaders.</p>
      
      <h2>Beyond Co-working Spaces</h2>
      <p>Modern digital hubs like DigiPlus Alliance offer much more than just shared office spaces. They provide:</p>
      <ul>
        <li><strong>Mentorship Programs:</strong> Access to experienced entrepreneurs and industry experts who provide guidance on everything from product development to market entry strategies.</li>
        <li><strong>Funding Connections:</strong> Direct links to angel investors, venture capitalists, and development finance institutions looking to invest in African startups.</li>
        <li><strong>Technical Infrastructure:</strong> High-speed internet, cloud computing resources, and access to cutting-edge software and development tools.</li>
        <li><strong>Market Access:</strong> Connections to potential customers, partners, and distribution channels across Africa and beyond.</li>
      </ul>
      
      <h2>Success Stories</h2>
      <p>The impact of digital hubs can be seen in the numerous success stories emerging from these innovation centers. From fintech solutions addressing financial inclusion challenges to agtech platforms revolutionizing farming practices, hub-supported startups are creating solutions that address real African challenges.</p>
      
      <h3>Case Study: TechSolve Africa</h3>
      <p>One of our recent success stories is TechSolve Africa, a startup that joined our hub in early 2024. Founded by three university graduates, the company developed a mobile platform connecting rural farmers with urban markets.</p>
      
      <p>Through our program, they received:</p>
      <ul>
        <li>12 months of free co-working space</li>
        <li>Weekly mentorship sessions with industry experts</li>
        <li>Access to our network of potential investors</li>
        <li>Technical support for platform development</li>
        <li>Market research and business development assistance</li>
      </ul>
      
      <p>Today, TechSolve Africa serves over 5,000 farmers across three states and recently closed a $500,000 seed funding round.</p>
      
      <h2>The Role of International Partnerships</h2>
      <p>The support from international partners like the EU and Germany has been instrumental in scaling the impact of digital hubs across Africa. These partnerships provide not only funding but also access to global markets, technical expertise, and best practices from successful innovation ecosystems worldwide.</p>
      
      <h2>Building for the Future</h2>
      <p>As we look ahead, digital hubs are evolving to meet the changing needs of the startup ecosystem. Key trends include:</p>
      
      <ul>
        <li><strong>Specialized Programs:</strong> Sector-specific incubation programs focusing on areas like healthtech, edtech, and cleantech.</li>
        <li><strong>Cross-border Collaboration:</strong> Programs that facilitate partnerships between startups from different African countries.</li>
        <li><strong>Skills Development:</strong> Comprehensive training programs addressing the digital skills gap in key areas like data science, AI, and cybersecurity.</li>
        <li><strong>Policy Advocacy:</strong> Working with governments to create enabling environments for digital innovation and entrepreneurship.</li>
      </ul>
      
      <h2>Join the Movement</h2>
      <p>The digital transformation of Africa is not just happening—it's accelerating. Digital hubs like DigiPlus Alliance are at the center of this movement, creating the infrastructure, connections, and support systems that tomorrow's leading African companies need to thrive.</p>
      
      <p>Whether you're an aspiring entrepreneur with a game-changing idea, an investor looking for the next big opportunity, or an organization wanting to contribute to Africa's digital future, there's a place for you in this ecosystem.</p>
      
      <p>The future of Africa is digital, and it's being built one startup at a time in hubs like ours. Join us as we empower the next generation of African innovators to create solutions that will transform the continent and beyond.</p>
    `
  },
  {
    id: "digital-skills-training-program-launch",
    image: "/blog/image_one.png",
    title: "Launching Our Comprehensive Digital Skills Training Program",
    description: "DigiPlus Alliance is excited to announce the launch of our comprehensive digital skills training program, designed to equip entrepreneurs and business owners with essential digital competencies.",
    tags: ["Training", "Digital Skills", "Capacity Building"],
    date: "28 Feb",
    category: "Training",
    readTime: "4min",
    author: "Training Team",
    content: `
      <p>DigiPlus Alliance is excited to announce the launch of our comprehensive digital skills training program, designed to equip entrepreneurs and business owners with essential digital competencies needed to thrive in today's digital economy.</p>
      
      <h2>Program Overview</h2>
      <p>Our training program covers a wide range of digital skills, from basic computer literacy to advanced digital marketing and e-commerce strategies. The curriculum has been carefully designed based on our extensive research and direct feedback from the business community.</p>
      
      <h2>Key Training Modules</h2>
      
      <h3>1. Digital Fundamentals</h3>
      <ul>
        <li>Basic computer and smartphone operation</li>
        <li>Internet navigation and email management</li>
        <li>Cloud storage and file management</li>
        <li>Digital security and privacy protection</li>
      </ul>
      
      <h3>2. Business Applications</h3>
      <ul>
        <li>Digital record-keeping and inventory management</li>
        <li>Online banking and mobile money platforms</li>
        <li>Customer relationship management</li>
        <li>Point-of-sale systems and digital payments</li>
      </ul>
      
      <h3>3. Marketing and Sales</h3>
      <ul>
        <li>Social media marketing on WhatsApp, Facebook, and Instagram</li>
        <li>Creating compelling product photos and descriptions</li>
        <li>Online marketplace strategies</li>
        <li>Customer service through digital channels</li>
      </ul>
      
      <h3>4. E-commerce and Online Business</h3>
      <ul>
        <li>Setting up online stores</li>
        <li>Order management and fulfillment</li>
        <li>Digital payment integration</li>
        <li>Analytics and performance tracking</li>
      </ul>
      
      <h2>Training Delivery Methods</h2>
      <p>Recognizing the diverse needs and schedules of our participants, we offer multiple training delivery options:</p>
      
      <ul>
        <li><strong>In-person workshops:</strong> Hands-on training sessions conducted at our hub and partner locations</li>
        <li><strong>Mobile training units:</strong> Bringing training directly to communities and markets</li>
        <li><strong>Online modules:</strong> Self-paced learning accessible via smartphones and computers</li>
        <li><strong>Peer-to-peer mentoring:</strong> Connecting participants with digitally advanced business owners</li>
      </ul>
      
      <h2>Language and Cultural Adaptation</h2>
      <p>All training materials are available in multiple local languages, with instructors who understand the cultural context and specific challenges faced by local businesses. We believe that language should never be a barrier to digital empowerment.</p>
      
      <h2>Success Metrics and Support</h2>
      <p>Participants will receive ongoing support even after completing their training, including:</p>
      <ul>
        <li>Follow-up coaching sessions</li>
        <li>Access to our digital tools library</li>
        <li>Connection to our alumni network</li>
        <li>Advanced training opportunities</li>
      </ul>
      
      <h2>Registration and Next Steps</h2>
      <p>Registration is now open for our first cohort, which begins on March 15th. Priority will be given to MSMEs that demonstrate a strong commitment to digital transformation and have the potential to create positive community impact.</p>
      
      <p>Interested participants can register through our partner organizations or visit our hub directly. Financial support is available for qualifying businesses through our scholarship program.</p>
      
      <p>This training program represents our commitment to ensuring that the benefits of digital transformation reach every corner of our community. Together, we're building a digitally empowered future for African businesses.</p>
    `
  },
  {
    id: "partnership-announcement-mtn-foundation",
    image: "/blog/blog_2.png",
    title: "Strategic Partnership with MTN Foundation: Expanding Digital Access",
    description: "We're thrilled to announce our strategic partnership with MTN Foundation, aimed at expanding digital access and opportunities for underserved communities across Nigeria.",
    tags: ["Partnership", "Digital Access", "MTN Foundation"],
    date: "10 Feb",
    category: "News",
    readTime: "3min",
    author: "DigiPlus Alliance",
    content: `
      <p>We're thrilled to announce our strategic partnership with MTN Foundation, aimed at expanding digital access and opportunities for underserved communities across Nigeria. This collaboration represents a significant milestone in our mission to democratize digital transformation across Africa.</p>
      
      <h2>Partnership Objectives</h2>
      <p>Our partnership with MTN Foundation focuses on four key areas:</p>
      
      <ul>
        <li><strong>Infrastructure Development:</strong> Expanding reliable internet connectivity to rural and underserved areas</li>
        <li><strong>Digital Literacy Programs:</strong> Comprehensive training initiatives targeting different demographic groups</li>
        <li><strong>Entrepreneurship Support:</strong> Providing resources and mentorship for digital entrepreneurs</li>
        <li><strong>Innovation Acceleration:</strong> Supporting local tech startups through funding and technical assistance</li>
      </ul>
      
      <h2>Planned Initiatives</h2>
      
      <h3>Mobile Digital Centers</h3>
      <p>Together, we will deploy mobile digital centers equipped with high-speed internet, computers, and training materials. These centers will visit remote communities on a rotating schedule, bringing digital services directly to where they're needed most.</p>
      
      <h3>Community Champion Program</h3>
      <p>We're establishing a network of community champions - local leaders who will receive advanced digital training and serve as ongoing support resources for their communities. This sustainable approach ensures long-term impact beyond our direct interventions.</p>
      
      <h3>Youth Digital Skills Initiative</h3>
      <p>Recognizing that young people are the future of Africa's digital economy, we're launching a comprehensive program targeting students and recent graduates. This initiative will provide coding bootcamps, digital marketing workshops, and entrepreneurship training.</p>
      
      <h2>Expected Impact</h2>
      <p>Over the next three years, this partnership aims to:</p>
      <ul>
        <li>Reach over 50,000 individuals across 200 communities</li>
        <li>Train 500 community champions</li>
        <li>Support 100 new digital enterprises</li>
        <li>Create sustainable digital infrastructure in underserved areas</li>
      </ul>
      
      <h2>A Message from Our Leadership</h2>
      <blockquote>
        <p>"This partnership with MTN Foundation represents more than just collaboration—it's a shared commitment to ensuring that no community is left behind in Africa's digital transformation. Together, we're not just providing access to technology; we're creating pathways to opportunity and empowerment."</p>
        <cite>- CEO, DigiPlus Alliance</cite>
      </blockquote>
      
      <h2>Getting Involved</h2>
      <p>Communities interested in hosting mobile digital centers or nominating potential community champions can reach out through our partner network. We're also looking for additional corporate and development partners who share our vision of digital inclusion.</p>
      
      <p>This partnership marks the beginning of an exciting new chapter in our work. With MTN Foundation's extensive network and resources combined with our grassroots experience and community connections, we're confident that we can achieve meaningful, lasting impact across Nigeria and beyond.</p>
      
      <p>Stay tuned for updates on our joint initiatives and opportunities to get involved in this transformative work.</p>
    `
  },
  {
    id: "women-entrepreneurs-spotlight-success-stories",
    image: "/blog/blog_3.png",
    title: "Women Entrepreneurs Spotlight: Inspiring Success Stories from Our Community",
    description: "Celebrating the remarkable achievements of women entrepreneurs in our network who are breaking barriers and creating innovative solutions across various industries.",
    tags: ["Women Entrepreneurs", "Success Stories", "Empowerment"],
    date: "08 Jan",
    category: "Innovation",
    readTime: "6min",
    author: "Community Team",
    content: `
      <p>At DigiPlus Alliance, we're proud to support a diverse community of entrepreneurs, and today we're celebrating the remarkable achievements of women entrepreneurs in our network who are breaking barriers and creating innovative solutions across various industries.</p>
      
      <h2>Meet Our Inspiring Women Leaders</h2>
      
      <h3>Fatima Adebayo - HealthTech Pioneer</h3>
      <p>Fatima joined our hub in 2023 with a vision to improve maternal healthcare in rural Nigeria. Her startup, MomCare Digital, has developed a mobile platform that connects expectant mothers with healthcare providers, provides educational content, and tracks pregnancy milestones.</p>
      
      <p><strong>Key Achievements:</strong></p>
      <ul>
        <li>Served over 2,000 expectant mothers across five states</li>
        <li>Reduced missed prenatal appointments by 40% in pilot communities</li>
        <li>Received $200,000 in seed funding from international development partners</li>
        <li>Featured in TechCrunch as one of Africa's most promising healthtech startups</li>
      </ul>
      
      <blockquote>
        <p>"The support I received at DigiPlus Alliance wasn't just about workspace or funding—it was about believing in my vision when others couldn't see it. Today, every healthy baby delivered through our platform is a testament to what's possible when women entrepreneurs are given the right support."</p>
        <cite>- Fatima Adebayo, Founder of MomCare Digital</cite>
      </blockquote>
      
      <h3>Grace Okonkwo - EdTech Innovator</h3>
      <p>A former teacher turned entrepreneur, Grace recognized the gap in quality educational content for primary school students in Nigeria. Her company, LearnNinja, creates interactive educational games and content in local languages.</p>
      
      <p><strong>Key Achievements:</strong></p>
      <ul>
        <li>Developed 50+ educational games covering mathematics, science, and literacy</li>
        <li>Partnerships with 200+ schools across West Africa</li>
        <li>Won the African EdTech Innovation Award 2024</li>
        <li>Team of 15 developers, content creators, and educators</li>
      </ul>
      
      <h3>Aisha Mohammed - FinTech Revolutionary</h3>
      <p>Aisha's background in microfinance inspired her to create PayForward, a mobile savings and lending platform designed specifically for women-led small businesses. The platform combines traditional community savings practices with modern technology.</p>
      
      <p><strong>Key Achievements:</strong></p>
      <ul>
        <li>Facilitated over $500,000 in microloans</li>
        <li>98% loan repayment rate among users</li>
        <li>15,000 active users across Nigeria and Ghana</li>
        <li>Featured speaker at the African FinTech Summit</li>
      </ul>
      
      <h2>Common Success Factors</h2>
      
      <p>Analyzing the journeys of our successful women entrepreneurs, several common factors emerge:</p>
      
      <h3>1. Problem-First Approach</h3>
      <p>Each of these entrepreneurs started with a real problem they had personally experienced or observed in their communities. Their solutions weren't technology-driven but problem-driven, with technology as the enabler.</p>
      
      <h3>2. Community-Centric Design</h3>
      <p>All three companies prioritized understanding their users deeply, conducting extensive community research, and iterating based on real user feedback rather than assumptions.</p>
      
      <h3>3. Persistence Through Challenges</h3>
      <p>Each entrepreneur faced significant challenges, from funding rejections to technical setbacks. Their ability to persist, pivot when necessary, and maintain their vision was crucial to their success.</p>
      
      <h3>4. Strategic Use of Networks</h3>
      <p>They leveraged the DigiPlus Alliance community not just for resources but for strategic partnerships, mentorship, and peer support that proved invaluable in scaling their businesses.</p>
      
      <h2>Supporting the Next Generation</h2>
      
      <p>Inspired by these success stories, we're launching several new initiatives to support women entrepreneurs:</p>
      
      <ul>
        <li><strong>Women Founders Circle:</strong> A monthly networking and mentorship program connecting established and aspiring women entrepreneurs</li>
        <li><strong>She Leads Accelerator:</strong> A 12-week intensive program providing funding, mentorship, and market access specifically for women-led startups</li>
        <li><strong>Childcare Support Fund:</strong> Financial assistance for women entrepreneurs to access childcare services during training and networking events</li>
        <li><strong>Women in Tech Skills Program:</strong> Technical training programs addressing the gender gap in STEM fields</li>
      </ul>
      
      <h2>Looking Forward</h2>
      
      <p>The success stories of Fatima, Grace, Aisha, and many other women in our community demonstrate that when women entrepreneurs are given the right support, resources, and opportunities, they don't just succeed—they transform entire industries and communities.</p>
      
      <p>We're committed to continuing this support and creating an ecosystem where women entrepreneurs can thrive. Their success is not just their own—it's a victory for their communities, their countries, and the entire African continent.</p>
      
      <p>If you're a woman entrepreneur with a vision for change, or if you know someone who is, we invite you to join our community. Together, we're building the future of African innovation, one woman entrepreneur at a time.</p>
    `
  }
];

export const featuredPost = blogPosts[0];

export const sidebarPosts = blogPosts.slice(1, 3);

export const allPosts = blogPosts;
