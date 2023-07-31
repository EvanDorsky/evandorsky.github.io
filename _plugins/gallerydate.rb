module Jekyll
  module GalleryDateFilter
    def gallerydate(datetime, f)
      today = Date.today

      if datetime.is_a?(Integer)
        datetime = Time.at(datetime)
      end

      date = datetime.to_date
      days_elapsed = (today - date).to_i

      if datetime.day == today
        "Today"
      elsif days_elapsed == 1
        "Yesterday"
      elsif days_elapsed < 7
        "#{days_elapsed} days ago"
      elsif datetime.year == today.year
        datetime.strftime(f)
      else
        datetime.year.to_s
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::GalleryDateFilter)